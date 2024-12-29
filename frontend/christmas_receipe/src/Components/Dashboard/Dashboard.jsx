import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "../Home/Home";
import AddRecipe from "../AddNew/AddRecipe";
import Search from "../Search/Search";
import Favorite from "../FavoriteRecipes/Favorite";
import ViewRecipe from "../Home/ViewRecipe";

const Dashboard = () => {
    var homePage;
    var SearchPage;
    var YourPage;
    const goBackToHome =useCallback(() => {
      setSelectedRecipe(null);
      setLoadPage(homePage);
      localStorage.setItem("selectedPage", 0);

    }, [homePage]);
    const goBackToSearch =useCallback(() => {
      setSelectedRecipe(null);
      setLoadPage(SearchPage);
      localStorage.setItem("selectedPage", 1);
    }, [SearchPage]);

    const goBackToYourPage =useCallback(() => {
      setSelectedRecipe(null);
      setLoadPage(YourPage);
      localStorage.setItem("selectedPage", 3);
    }, [YourPage]);

    const handleRecipeSelect = useCallback((recipe) => {
      setSelectedRecipe(recipe);
      setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToHome} text="Home"  />);
      localStorage.setItem("SelectedRecipe", recipe);
      localStorage.setItem("selectedPage","viewRecipe" );
    }, [goBackToHome]);

    const handleSearchRecipeSelect = useCallback((recipe) => {
      setSelectedRecipe(recipe);
      setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToSearch} text="Search"  />);
      localStorage.setItem("SelectedRecipe", recipe);
      localStorage.setItem("selectedPage","SearchRecipe" );
    }, [goBackToSearch]);

    const handleYourPageRecipeSelect = useCallback((recipe) => {
      setSelectedRecipe(recipe);
      setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToYourPage} text="Your Recipes"  />);
      localStorage.setItem("SelectedRecipe", recipe);
      localStorage.setItem("selectedPage","YourPageRecipe" );
    }, [goBackToYourPage]);


    homePage = <Home onRecipeSelect={handleRecipeSelect} />;
    SearchPage = <Search onRecipeSelect={handleSearchRecipeSelect} />;
    YourPage = <Favorite onRecipeSelect={handleYourPageRecipeSelect} />;

    const [selectedIcon, setSelectedIcon] = useState(0);
    const [loadPage, setLoadPage] = useState(
      homePage
    );
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    console.log(selectedRecipe);


    const FooterIcons = useMemo(
      () => [
        {
          id: "HomeIcon",
          icon: "bi-house-fill",
          text: "Home",
          component: <Home onRecipeSelect={handleRecipeSelect} />,
        },
        {
          id: "SearchIcon",
          icon: "bi-search",
          text: "Search",
          component: <Search onRecipeSelect={handleSearchRecipeSelect}  />,
        },
        {
          id: "AddIcon",
          icon: "bi-plus-circle",
          text: "Add Recipe",
          component: <AddRecipe onBack={goBackToYourPage}/>,
        },
        {
          id: "FavoriteIcon",
          icon: "bi-list-task",
          text: "Your Recipes",
          component: <Favorite onRecipeSelect={handleYourPageRecipeSelect} />,
        },
      ],
      [handleRecipeSelect,handleSearchRecipeSelect,handleYourPageRecipeSelect,goBackToYourPage]
    );
    useEffect(() => {
      const savedPage = localStorage.getItem("selectedPage");
      const recipe = localStorage.getItem("SelectedRecipe");
      if (savedPage) {
        if(savedPage === "viewRecipe"){
          setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToHome} text="Home"  />);
        }else if(savedPage === "SearchRecipe"){
          setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToSearch} text="Search" />);
        }
        else if(savedPage === "YourPageRecipe"){
          setLoadPage(<ViewRecipe selectedRecipe={recipe} onBack={goBackToYourPage} text="Your Recipes" />);
        }
        else{
          
            setSelectedIcon(Number(savedPage));
            const page = FooterIcons[Number(savedPage)]?.component;
            setLoadPage(page || <Home onRecipeSelect={handleRecipeSelect} />);
          
      }
        
      }
    }, [FooterIcons, handleRecipeSelect,goBackToHome,goBackToSearch,handleSearchRecipeSelect,handleYourPageRecipeSelect,goBackToYourPage]);

    const handleFooterIcon = (index) => {
      setSelectedIcon(index);
      const page = FooterIcons[index].component;
      setLoading(true);
      setTimeout(() => {
        setLoadPage(page);
        setLoading(false);
      }, 1500);
      localStorage.setItem("selectedPage", index);
    };

    const toggleSidebar = () => {
      const sidebar = document.querySelector(".NavSidebar");
      const MainContentBox = document.querySelector(".MainContentBox");
      const sidebarIcons = document.querySelector(".sidebarIcons");
      const ToggleIcon = document.querySelector(".ToggleIcon");
      const iconText = document.querySelectorAll(".iconText");
      sidebar.classList.toggle("openSidebar");
      MainContentBox.classList.toggle("openMainContent");
      sidebarIcons.classList.toggle("sidebarIconsWidth");
      iconText.forEach((text) => {
        text.classList.toggle("hideIconText");
      });
      ToggleIcon.classList.toggle("bi-list");
      ToggleIcon.classList.toggle("bi-x-lg");
    };

    return (
      <div className="MainAppContainer">
        <div className="MobileNavbar">
          <div className="Mob_NavHeading">
            <h2>𝕱𝖗𝖔𝖘𝖙 & 𝕱𝖊𝖆𝖘𝖙</h2>
          </div>
          {/* <div className="userDetails">
            <img src="/images/user_icon.png" alt="" />
          </div> */}
        </div>
        <div className="NavAndSidebar">
          <div className="NavHeading">
            <h2 className="headingText">𝕱𝖗𝖔𝖘𝖙 & 𝕱𝖊𝖆𝖘𝖙</h2>
            {/* <div className="NavUserDetails">
              <img src="/images/user_icon.png" alt="" />
            </div> */}
          </div>
          <div className="NavSidebar">
            <div className="toggleSidebarIcon" onClick={toggleSidebar}>
              <b>
                <i className="bi bi-x-lg ToggleIcon"></i>
              </b>
            </div>
            <div className="sidebarIcons">
              <ul>
                {FooterIcons.map((icon, index) => (
                  <li
                    onClick={() => handleFooterIcon(index)}
                    id={icon.id}
                    key={icon.id}
                    className={selectedIcon === index ? "selected" : ""}
                  >
                    <i className={`bi ${icon.icon}`}></i>
                    <span className="iconText">
                      &nbsp;&nbsp;&nbsp;{icon.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="MainContentBox">
          {loading ? (
            <div className="loader">
              <video
                className="loading-video"
                autoPlay
                loop
                muted
                style={{ playbackRate: 10, filter: "invert(1)" }}
              >
                <source src="/videos/santa_loading.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            loadPage
          )}
        </div>
        <div className="MobileFooter">
          <div className="footerLinks">
            <ul id="FooterIcons">
              {FooterIcons.map((icon, index) => (
                <li
                  onClick={() => handleFooterIcon(index)}
                  id={icon.id}
                  key={icon.id}
                  className={selectedIcon === index ? "selected" : ""}
                >
                  <i className={`bi ${icon.icon}`}></i>
                </li>
              ))}
              <div id="circle" style={{ left: `${selectedIcon * 24 + 2}%` }}>
                <i
                  id="CircleIcon"
                  className={`bi ${FooterIcons[selectedIcon]?.icon}`}
                  style={{ top: "0px" }}
                ></i>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
