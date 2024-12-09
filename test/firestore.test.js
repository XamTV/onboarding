import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc } from "firebase/firestore";
describe("Firestore Rules", () => {
  let testEnv;

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
  });

  it("should allow a teacher to read a student's document", async () => {
    const teacherAuth = testEnv.authenticatedContext("teacher-id", {
      role: "teacher",
      students: ["student-id"],
    });
    const db = teacherAuth.firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, "login", "teacher-id"), {
        role: "teacher",
        students: ["student-id"],
      });
      await setDoc(doc(adminDb, "login", "student-id"), { role: "student" });
    });

    const studentDoc = doc(db, "login", "student-id");
    await expect(getDoc(studentDoc)).resolves.toBeDefined();
  });

  // should deny a teacher from reading a non-student's document
  it("should deny a teacher from reading a non-student's document", async () => {
    const teacherAuth = testEnv.authenticatedContext("teacher-id", {
      role: "teacher",
      students: ["student-id"],
    });
    const db = teacherAuth.firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, "login", "other-student-id"), {
        role: "student",
      });
    });
    const nonStudentDoc = doc(db, "login", "other-student-id");
    await expect(getDoc(nonStudentDoc)).rejects.toThrow();
  });

  // should allow a user to read their own document

  it("should allow a user to read their own document", async () => {
    const userAuth = testEnv.authenticatedContext("user-id", {});
    const db = userAuth.firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, "login", "user-id"), { role: "user" });
    });
    const userDoc = doc(db, "login", "user-id");
    await expect(getDoc(userDoc)).resolves.toBeDefined();
  });

  // should deny a user from reading another user's document

  it("should deny a user from reading another user's document", async () => {
    const userAuth = testEnv.authenticatedContext("user-id", {});
    const db = userAuth.firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setDoc(doc(adminDb, "login", "other-user-id"), { role: "user" });
    });
    const otherUserDoc = doc(db, "login", "other-user-id");
    await expect(getDoc(otherUserDoc)).rejects.toThrow();
  });

  // should allow any authenticated user to read/write notifications"
  it("should allow any authenticated user to read/write notifications", async () => {
    const userAuth = testEnv.authenticatedContext("user-id", {});
    const db = userAuth.firestore();

    const notificationDoc = doc(db, "notification", "custom-id");
    await expect(
      setDoc(notificationDoc, { student: 1 })
    ).resolves.toBeUndefined();
    await expect(getDoc(notificationDoc)).resolves.toBeDefined();
  });

  // should deny unauthenticated users from accessing notifications
  it("should deny unauthenticated users from accessing notifications", async () => {
    const unauthenticated = testEnv.unauthenticatedContext();
    const db = unauthenticated.firestore();

    const notificationDoc = doc(db, "notification", "custom-id");
    await expect(setDoc(notificationDoc, { student: 1 })).rejects.toThrow();
    await expect(getDoc(notificationDoc)).rejects.toThrow();
  });
});
