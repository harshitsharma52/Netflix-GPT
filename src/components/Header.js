import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser ,removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick=()=>{
    //Toggle GPT Search
    dispatch(toggleGptSearchView());

  }

  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
   //unsubscribe when component unmount
    return()=>unsubscribe();
  }, []);
  

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };


  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      

<div className="flex mx-auto md:mx-0 gap-3 items-center">
        <img
        className="w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="logo"
      />
        <div className="text-white  ">
          <ul className="flex gap-3 cursor-pointer  text-lg">
          
              {" "}
              <li>Home</li>
      
           
              {" "}
              <li>TV shows</li>
           
            <li>Movies</li>
           
              {" "}
              <li>GPT Search</li>

          </ul>
        </div>
      </div>
      
      {user && (

        <div className=" flex mx-auto md:mx-0 gap-3 flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="hidden md:block w-12 h-12" alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;