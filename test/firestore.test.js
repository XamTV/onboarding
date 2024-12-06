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
});
