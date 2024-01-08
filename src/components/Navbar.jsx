import  React, {useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Hamburger from 'hamburger-react'
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import { LinkButton } from "./Design/Button";


const Navbar = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [toogleNav, setToogleNav] = useState();
  const [ProfileImage, setProfileImage] = useState(null);


  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  useEffect(() => {
    setToogleNav(false);

  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setProfileImage(user.photoURL)

    });

    return () => {
      unsubscribe()
    }
  }, []);

  const handleToogle = () => {
    if (toogleNav) {
      setToogleNav(false);
    } else setToogleNav(true);
  };

  return (
    <nav className=" w-[100%] mx-auto border-b-1 border-black fixed z-10 ">
      <div className="  p-2 md:p-3 bg-white  border ">
        <div className="flex items-center justify-between ">
          <Link to="/">
            <div className="">
              <img className="h-10 w-full md:h-12" src='https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' alt="logo" />
            </div>
          </Link>

          {user ? (
            <div>
              <div className="hidden md:flex space-x-3 items-center">
                <LinkButton  
                  to="/create-listing">
                List item
                
                </LinkButton>
                <Link
                 
                >
                </Link>
                <LinkButton
              
                  to="/profile/rentalrequests"
                >
                  Requests
                </LinkButton>
                <div
                  className="rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ring-2 ring-white"
                  onClick={handleToogle}
                >
                  <img className="rounded-full w-8 h-8" src={ProfileImage} alt="" />
                </div>
              </div>
              <div
                className="md:hidden rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ring-2 ring-white"
                onClick={handleToogle}
              >
                <img
                  className="rounded-full"
                  src={ProfileImage}
                  alt="No image"
                />
              </div>
              {toogleNav && <SideNav/>}
            </div>
          ) : (!user &&

            (<>
              <div className=" space-x-3 hidden md:flex">
                <Link
                  className=" hover:text-orange-500 p-1 mx-1 "
                  to="/howitworks"
                >
                  How it works
                </Link>
                <Link to="/sign-in" className="bg-blue-600 text-white p-1 px-2 rounded-full">Sign-In</Link>
              </div>
              <div className="flex md:hidden" >
                <Hamburger toggled={toogleNav} toggle={setToogleNav} />
                {
                  toogleNav && <SideNav/>
                }
              </div>
            </>
            )
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar