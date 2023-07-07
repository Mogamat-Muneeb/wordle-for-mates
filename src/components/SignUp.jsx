import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { GoogleIcon } from "./Icons";
const SignUp = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (providerType) => {
    let result;
    if (providerType === "google") {
      result = await signInWithPopup(auth, provider);
      console.log(result, "result goodle");
    } else if (providerType === "email") {
      result = await createUserWithEmailAndPassword(auth, email, password);
    }
    const userRef = doc(db, "users", result.user.uid);
    const docSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      await setDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName || "",
        email: result.user.email,
        photoURL: result.user.photoURL || "",
      });

      await sendEmailVerification(result.user);
    }

    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-col h-full gap-4 p-10 ">
            <button
              onClick={() => signIn("google")}
              className="w-[300px] p-1 rounded-[2px] focus:outline-none focus:ring-0 text-[14px] font-normal border-[1px] border-black  mx-auto flex items-center gap-3 justify-center"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
            <span>-or-</span>
            <div className="w-[300px] flex justify-center">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[300px] p-1 rounded-[2px] focus:outline-none focus:ring-0 placeholder:text-[14px] placeholer:font-normal text-[14px] font-normal border-[1px] border-black  mx-auto "
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[300px] p-1 rounded-[2px] focus:outline-none focus:ring-0 placeholder:text-[14px] placeholer:font-normal text-[14px] font-normal border-[1px] border-black  mx-auto "
                />
                <button
                  onClick={() => signIn("email")}
                  className="w-[300px] p-2 rounded-[2px] focus:outline-none focus:ring-0  text-white text-[14px] font-normal  bg-black  mx-auto"
                >
                  Sign in with Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
