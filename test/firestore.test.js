import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc } from "firebase/firestore";

describe("Firestore Rules", () => {
  let testEnv;

  const teacher1Id = "teacher1-id";
  const teacher2Id = "teacher2-id";
  const student1Id = "student1-id";
  const student2Id = "student2-id";
  const student3Id = "student3-id";
  const student4Id = "student4-id";

  beforeAll(async () => {
    const rules = readFileSync(
      resolve(__dirname, "../firestore.rules"),
      "utf8"
    );
    testEnv = await initializeTestEnvironment({
      projectId: "onboarding-89c59",
      firestore: {
        rules,
        host: "localhost",
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();

      await setDoc(doc(adminDb, "login", teacher1Id), {
        role: "teacher",
        students: [student1Id, student2Id],
      });
      await setDoc(doc(adminDb, "login", teacher2Id), {
        role: "teacher",
        students: [student3Id, student4Id],
      });

      await setDoc(doc(adminDb, "login", student1Id), {
        role: "student",
        description: "Hello, my name is Paul",
      });
      await setDoc(doc(adminDb, "login", student2Id), {
        role: "student",
        description: "Hello, my name is Isabel",
      });
      await setDoc(doc(adminDb, "login", student3Id), {
        role: "student",
        description: "Hello, my name is Marie",
      });
      await setDoc(doc(adminDb, "login", student4Id), {
        role: "student",
        description: "Hello, my name is Jack",
      });
    });
  });
  it("should allow a teacher to read a student's document", async () => {
    const teacherAuth = testEnv.authenticatedContext(teacher1Id, {
      role: "teacher",
      students: [student1Id],
    });
    const db = teacherAuth.firestore();

    const studentDoc = doc(db, "login", student1Id);
    await expect(getDoc(studentDoc)).resolves.toBeDefined();
  });

  it("should deny a teacher from writing in a user's document", async () => {
    const teacherAuth = testEnv.authenticatedContext(teacher1Id, {});
    const db = teacherAuth.firestore();

    const userDoc = doc(db, "login", student2Id);
    await expect(
      setDoc(userDoc, { description: "Hello, this is your teacher" })
    ).rejects.toThrow();
  });

  it("should deny a teacher from reading a other teacher student's document", async () => {
    const teacherAuth = testEnv.authenticatedContext(teacher1Id, {
      role: "teacher",
      students: [student1Id, student2Id],
    });
    const db = teacherAuth.firestore();

    const nonStudentDoc = doc(db, "login", student3Id);
    await expect(getDoc(nonStudentDoc)).rejects.toThrow();
  });

  it("should allow a user to read their own document", async () => {
    const userAuth = testEnv.authenticatedContext(student1Id, {});
    const db = userAuth.firestore();

    const userDoc = doc(db, "login", student1Id);
    await expect(getDoc(userDoc)).resolves.toBeDefined();
  });

  it("should deny a user from reading another user's document", async () => {
    const userAuth = testEnv.authenticatedContext(student1Id, {});
    const db = userAuth.firestore();

    const otherUserDoc = doc(db, "login", student2Id);
    await expect(getDoc(otherUserDoc)).rejects.toThrow();
  });

  it("should allow any authenticated user to read/write notifications", async () => {
    const userAuth = testEnv.authenticatedContext(student1Id, {});
    const db = userAuth.firestore();

    const notificationDoc = doc(db, "notification", "custom-id");
    const notificationData = { students: 1 };
    await expect(
      setDoc(notificationDoc, { students: 1 })
    ).resolves.toBeUndefined();
    await expect(getDoc(notificationDoc)).resolves.toBeDefined();

    const docResult = await getDoc(notificationDoc);
    expect(docResult.exists()).toBe(true);
    expect(docResult.data()).toEqual(notificationData);
  });

  it("should deny unauthenticated users from accessing notifications", async () => {
    const unauthenticated = testEnv.unauthenticatedContext();
    const db = unauthenticated.firestore();

    const notificationDoc = doc(db, "notification", "custom-id");
    await expect(setDoc(notificationDoc, { students: 1 })).rejects.toThrow();
    await expect(getDoc(notificationDoc)).rejects.toThrow();
  });
});
