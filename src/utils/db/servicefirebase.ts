import { 
    getFirestore, 
    collection, 
    getDocs,
    getDoc, 
    doc,
    query,
    addDoc,
    where,
    updateDoc, 
} from "firebase/firestore";
import app from "./firebase"
import bcrypt from "bcrypt";

const db = getFirestore(app);

type FirestoreDoc = {
    id: string;
    [key: string]: any;
};

type ServiceCallback = (response: {
    status: boolean | string;
    message: string;
    data?: any;
}) => void;

async function getDocsByField(
    collectionName: string,
    field: string,
    value: string,
): Promise<FirestoreDoc[]> {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
    }));
}

async function getUserByEmail(email: string): Promise<FirestoreDoc | null> {
    const data = await getDocsByField("users", "email", email);
    return data.length > 0 ? data[0] : null;
}

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signIn(
    email: string,
) {
    return getUserByEmail(email);
}

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
    },
    callback: Function,
) {
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
        callback({
            status: "error",
            message: "Email already exists",
        })
    } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const payload = {
            email: userData.email,
            fullname: userData.fullname,
            password: hashedPassword,
            role: "member",
        };

        try {
            await addDoc(collection(db, "users"), payload);
            callback({
                status: "success",
                message: "User registered successfully",
            });
        } catch (error: any) {
            callback({
                status: "error",
                message: error.message,
            });
        }
    }
}

export async function signInWithOAuth(
    userData: any,
    type: "google" | "github",
    callback: ServiceCallback,
) {
    try {
        const data = await getDocsByField("users", "email", userData.email);
        const payload = {
            fullname: userData.fullname,
            email: userData.email,
            image: userData.image || "",
            type,
        };

        if (data.length > 0) {
            const role = data[0].role || "member";
            await updateDoc(doc(db, "users", data[0].id), {
                ...payload,
                role,
            });
            callback({
                status: true,
                message: "OAuth sign in success",
                data: {
                    ...payload,
                    role,
                },
            })
        } else {
            const role = "member";
            await addDoc(collection(db, "users"), {
                ...payload,
                role,
            });
            callback({
                status: true,
                message: "OAuth sign in success",
                data: {
                    ...payload,
                    role,
                },
            });
        }
    } catch (error: any) {
        callback({
            status: false,
            message: "Failed to register or log in with OAuth",
        })
    }
}

export async function signInWithGoogle(
    userData: any,
    callback: ServiceCallback,
) {
    return signInWithOAuth(userData, "google", callback);
}

export async function signInWithGitHub(
    userData: any,
    callback: ServiceCallback,
) {
    return signInWithOAuth(userData, "github", callback);
}