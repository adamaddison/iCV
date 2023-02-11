appModuleObject.controller("iCVController", function($scope)
{
	// declaring constants which represent the numbers corresponding to each section of the menu bar
	$scope.PROFILE_SECTION = 0;
	$scope.PROJECTS_SECTION = 1;
	$scope.EDUCATION_SECTION = 2;
	$scope.EXPERIENCE_SECTION = 3;

	// This variable indicates the current section of the web app the user is in (profile by default)
	$scope.currentSection = $scope.PROFILE_SECTION;

	// declaring constants which represent the two tabs in the experience section
	$scope.RECENT_EXPERIENCE = 0;
	$scope.SKILLS = 1;
	$scope.TRAINING = 2;

	// This variable indicates the currently selected tab in the experience section
	$scope.currentExperienceTab = $scope.RECENT_EXPERIENCE;
	
	// declaring constants which represent the two themes (dark and light mode)
	$scope.LIGHT = 0;
	$scope.DARK = 1;
	
	// declaring constants that represent the actions of moving left and right in the context of switching between project images in fullscreen mode
	$scope.LEFT = 0;
	$scope.RIGHT = 1;
	
	// declaring constants that represent the actions of moving up and down in the context of switching between education institutes
	$scope.UP = 0;
	$scope.DOWN = 1;

	// These constants represent the open and closed of the education date label in pixels
	$scope.DATE_LABEL_CLOSED = "50px";
	$scope.DATE_LABEL_OPEN = "320px";

	// declaring variables representing the current UI theme
	$scope.toggleSwitchName = "icons/toggleOff.svg";
	$scope.currentTheme = $scope.LIGHT;
	$scope.emailImageSrc = "img/emailLight.png";
	
	// This variable indicates the number of the currently active fullscreen image for the image x of y label
	$scope.currentFullscreenImage = 1;
	// This variable contains the project ID of the project currently in fullscreen mode
	$scope.currentFullscreenProjectID = 0;
	
$scope.dateRanges = ["September 2019 - September 2020", "September 2015 - May 2019", "September 2013 - June 2015", "September 2008 - June 2013"];
	// This variable contains the date range text currently on display in the education timeline section (the latest date range text is the default value)
	$scope.currentSelectedDate = $scope.dateRanges[0];
	// This variable contains the object index number of the education institute currently on display
	$scope.currentEducationInstituteNumber = 0;
	// This constant indicates the total number of educational institutes that can be displayed (used to limit the maximum range of the current education institute number variable)
	$scope.INSTITUTE_COUNT = 4;

	// This variable indicates whether or not the UI elements in the full screen picture mode are visible (i.e. arrow buttons, image x of y label)
	$scope.fullscreenControlsVisible = true;
	
	// If the theme was set before in a previous session then the previously set value is assigned to the currentTheme variable
	if(localStorage.currentTheme !== undefined){ $scope.currentTheme = parseInt(localStorage.currentTheme); }
	
	// Creating variables which hold file names of button icons (changes during dark mode to icons appropriate for dark mode)
	$scope.fullscreenButtonFile="icons/fullscreen.svg";
	$scope.closeButtonFile="icons/closeBlack.svg";
	$scope.playButtonFile="icons/play.svg";
	$scope.fullscreenImageFile="";
	
	$scope.menuButtonIconFiles = ["icons/profile.svg", "icons/projects.svg", "icons/education.svg", "experience.svg"];
	
	// This variable contains the current values to be displayed in the full screen window
	$scope.fullscreenVars = {projectID: "", title: "", text: "", imageURL1: "", imageURL2: "", imageURL3: "", imageURL4: "", downloadLink: ""};
	
	$scope.testing = function()
	{
		document.getElementById("menuTitle").innerHTML = "hi";
	}
	
	// this function is used to switch to a different section in the menu bar
	$scope.switchSection = function(sectionNum)
	{
		// if the user clicked on profile then only the profile section is displayed
		if(sectionNum == $scope.PROFILE_SECTION)
		{
			// changing menu bar highlight so that only the profile menu bar button is highlighted
			if($scope.currentTheme == $scope.LIGHT) // Using light colours in light mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#d9d9d9";
				document.getElementById('projectsMenu').style.backgroundColor="#efefef";
				document.getElementById('educationMenu').style.backgroundColor="#efefef";
				document.getElementById('experienceMenu').style.backgroundColor="#efefef";
			}
			else if($scope.currentTheme == $scope.DARK) // Using dark colours in dark mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#454545";
				document.getElementById('projectsMenu').style.backgroundColor="#666666";
				document.getElementById('educationMenu').style.backgroundColor="#666666";
				document.getElementById('experienceMenu').style.backgroundColor="#666666";
			}

			// displaying the profile content and hiding the rest
			document.getElementById('profileContent').style.display = "block";
			document.getElementById('projectsContent').style.display = "none";
			document.getElementById('educationContent').style.display = "none";
				document.getElementById('eduBackground').style.display = "none";
			document.getElementById('experienceContent').style.display = "none";
			
			// Indicating that the user is now in the profile section
			$scope.currentSection = $scope.PROFILE_SECTION;
		}
		// if the user clicked on projects then only the projects section is displayed
		if(sectionNum == $scope.PROJECTS_SECTION)
		{
			// changing menu bar highlight so that only the profile menu bar button is highlighted
			if($scope.currentTheme == $scope.LIGHT) // Using light colours in light mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#efefef";
				document.getElementById('projectsMenu').style.backgroundColor="#d9d9d9";
				document.getElementById('educationMenu').style.backgroundColor="#efefef";
				document.getElementById('experienceMenu').style.backgroundColor="#efefef";
			}
			else if($scope.currentTheme == $scope.DARK) // Using dark colours in dark mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#666666";
				document.getElementById('projectsMenu').style.backgroundColor="#454545";
				document.getElementById('educationMenu').style.backgroundColor="#666666";
				document.getElementById('experienceMenu').style.backgroundColor="#666666";
			}
			
			// displaying the projects content and hiding the rest
			document.getElementById('profileContent').style.display = "none";
			document.getElementById('projectsContent').style.display = "block";
			document.getElementById('educationContent').style.display = "none";
				document.getElementById('eduBackground').style.display = "none";
			document.getElementById('experienceContent').style.display = "none";

			// Indicating that the user is now in the projects section
			$scope.currentSection = $scope.PROJECTS_SECTION;

			// Re-initialising the theme (prevents project preview boxes from remaining light grey when the page is reloaded in dark mode)
			initialiseTheme();
		}
		// if the user clicked on education then only the education section is displayed
		if(sectionNum == $scope.EDUCATION_SECTION)
		{
			// changing menu bar highlight so that only the profile menu bar button is highlighted
			if($scope.currentTheme == $scope.LIGHT) // Using light colours in light mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#efefef";
				document.getElementById('projectsMenu').style.backgroundColor="#efefef";
				document.getElementById('educationMenu').style.backgroundColor="#d9d9d9";
				document.getElementById('experienceMenu').style.backgroundColor="#efefef";
			}
			else if($scope.currentTheme == $scope.DARK) // Using dark colours in dark mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#666666";
				document.getElementById('projectsMenu').style.backgroundColor="#666666";
				document.getElementById('educationMenu').style.backgroundColor="#454545";
				document.getElementById('experienceMenu').style.backgroundColor="#666666";
			}
			
			// displaying the education content and hiding the rest
			document.getElementById('profileContent').style.display = "none";
			document.getElementById('projectsContent').style.display = "none";
			document.getElementById('educationContent').style.display = "block";
				document.getElementById('eduBackground').style.display = "block";
			document.getElementById('experienceContent').style.display = "none";

			// Indicating that the user is now in the education section
			$scope.currentSection = $scope.EDUCATION_SECTION;

			// Re-initialising the theme (prevents education boxes from remaining light colour when the page is reloaded in dark mode)
			initialiseTheme();
		}
		// if the user clicked on experience then only the experience section is displayed
		if(sectionNum == $scope.EXPERIENCE_SECTION)
		{
			// changing menu bar highlight so that only the profile menu bar button is highlighted
			if($scope.currentTheme == $scope.LIGHT) // Using light colours in light mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#efefef";
				document.getElementById('projectsMenu').style.backgroundColor="#efefef";
				document.getElementById('educationMenu').style.backgroundColor="#efefef";
				document.getElementById('experienceMenu').style.backgroundColor="#d9d9d9";
			}
			else if($scope.currentTheme == $scope.DARK) // Using dark colours in dark mode
			{
				document.getElementById('profileMenu').style.backgroundColor="#666666";
				document.getElementById('projectsMenu').style.backgroundColor="#666666";
				document.getElementById('educationMenu').style.backgroundColor="#666666";
				document.getElementById('experienceMenu').style.backgroundColor="#454545";
			}
			
			// displaying the experience content and hiding the rest
			document.getElementById('profileContent').style.display = "none";
			document.getElementById('projectsContent').style.display = "none";
			document.getElementById('educationContent').style.display = "none";
				document.getElementById('eduBackground').style.display = "none";
			document.getElementById('experienceContent').style.display = "block";

			// Indicating that the user is now in the experience section
			$scope.currentSection = $scope.EXPERIENCE_SECTION;
			
			// Re-initialising the theme (prevents recent experience boxes from remaining light colour when the page is reloaded in dark mode)
			initialiseTheme();
		}

	}
	
	// This function displays the fullscreen window containing information about the corresponding project
	$scope.fullscreen = function(projectID)
	{
		// showing the fullscreen window to the user with the dark background behind it
		document.getElementById('fullscreenWindow').style.display = "block";
		document.getElementById('darkBackground').style.display = "block";
		
		// assigning the values of the project being viewed to the fullscreen variables
		$scope.fullscreenVars.projectID = $scope.projects[projectID].projectID;
		$scope.fullscreenVars.title = $scope.projects[projectID].title;
		$scope.fullscreenVars.text = $scope.projects[projectID].text;
		$scope.fullscreenVars.imageURL1 = $scope.projects[projectID].imageURL1;
		$scope.fullscreenVars.imageURL2 = $scope.projects[projectID].imageURL2;
		$scope.fullscreenVars.imageURL3 = $scope.projects[projectID].imageURL3;
		$scope.fullscreenVars.imageURL4 = $scope.projects[projectID].imageURL4;
		$scope.fullscreenVars.downloadLink = $scope.projects[projectID].downloadLink;		
	}
	$scope.exitFullscreen = function()
	{
		// hiding the fullscreen window
		document.getElementById('fullscreenWindow').style.display = "none";
		document.getElementById('darkBackground').style.display = "none";
	}
	
	
	// This method is used to display the next / previous education institute information in the array (used with the arrow buttons)
	$scope.switchEducationInstitute = function(direction)
	{
		var background = document.getElementById('eduPic');
		
		// either moving up or down 1 object in the institute array (stopping at zero and the index of the last institute object)
		if(direction == $scope.UP && $scope.currentEducationInstituteNumber > 0){ $scope.currentEducationInstituteNumber -= 1; }
		else if(direction == $scope.DOWN && $scope.currentEducationInstituteNumber < $scope.INSTITUTE_COUNT-1){ $scope.currentEducationInstituteNumber += 1; }
		
		// Hiding all educational institute information
		for(var i=0;i<$scope.INSTITUTE_COUNT;i++){  document.getElementById('eduPane'+i).style.display="none"; }
		
		// Displaying the educational institute information, the date range, and the background image of the selected institute
		document.getElementById('eduPane'+$scope.currentEducationInstituteNumber).style.display="block";
		$scope.currentSelectedDate = $scope.dateRanges[$scope.currentEducationInstituteNumber];
		background.src = $scope.institutes[$scope.currentEducationInstituteNumber].imageURL;
	}
	
	// This method displays the information of a specified education institute and is used in the date range label picker (rather than using the arrow buttons to incrementally switch between different institutes)
	$scope.skipToEducationInstitute = function(selectedEducationInstitute)
	{		
		// Assigning the specified institute number to the local variable to indicate the currently displayed educational institute
		$scope.currentEducationInstituteNumber = selectedEducationInstitute;

		// Depending on what the current educational institute number is the appropriate information is displayed
		var background = document.getElementById('eduPic');
		
		// Hiding all educational institute information
		for(var i=0;i<$scope.INSTITUTE_COUNT;i++){  document.getElementById('eduPane'+i).style.display="none"; }
		
		// Displaying the educational institute information, the date range, and the background image of the selected institute
		document.getElementById('eduPane'+$scope.currentEducationInstituteNumber).style.display="block";
		$scope.currentSelectedDate = $scope.dateRanges[$scope.currentEducationInstituteNumber];
		background.src = $scope.institutes[$scope.currentEducationInstituteNumber].imageURL;
		
		$scope.collapseDateLabel();
	}

	// This function alternates between the skills and training tabs in the experience section
	$scope.switchExperienceTabs = function(tabValue)
	{

		// if the user clicked on the skills tab the skills content will be displayed and the training content hidden
		if(tabValue == $scope.RECENT_EXPERIENCE)
		{
			$scope.currentExperienceTab = $scope.RECENT_EXPERIENCE;
			
			document.getElementById('skillsContent').style.display="none";
			document.getElementById('trainingContent').style.display="none";
			document.getElementById('blankSpace').style.display="none";
			document.getElementById('rexperienceContents').style.display="block";
			
			// highlighting the skills tab (light mode)
			if($scope.currentTheme == $scope.LIGHT)
			{
				document.getElementById('rexperienceTab').style.backgroundColor="#daa520";
				document.getElementById('rexperienceTab').style.color="white";
				  document.getElementById('skillsTab').style.backgroundColor="white";
				  document.getElementById('skillsTab').style.color="#daa520";
				    document.getElementById('trainingTab').style.backgroundColor="white";
				    document.getElementById('trainingTab').style.color="#daa520";
			}
			// highlighting the skills tab (dark mode)
			else if($scope.currentTheme == $scope.DARK)
			{
				document.getElementById('rexperienceTab').style.backgroundColor="#daa520";
				document.getElementById('rexperienceTab').style.color="black";
				  document.getElementById('skillsTab').style.backgroundColor="black";
				  document.getElementById('skillsTab').style.color="#daa520";
				    document.getElementById('trainingTab').style.backgroundColor="black";
				    document.getElementById('trainingTab').style.color="#daa520";
			}
		}

		// if the user clicked on the skills tab the skills content will be displayed and the training content hidden
		if(tabValue == $scope.SKILLS)
		{
			$scope.currentExperienceTab = $scope.SKILLS;
			
			document.getElementById('skillsContent').style.display="block";
			document.getElementById('trainingContent').style.display="none";
			document.getElementById('blankSpace').style.display="block";
			document.getElementById('rexperienceContents').style.display="none";
			
			// highlighting the skills tab (light mode)
			if($scope.currentTheme == $scope.LIGHT)
			{
				document.getElementById('skillsTab').style.backgroundColor="#daa520";
				document.getElementById('skillsTab').style.color="white";
				  document.getElementById('trainingTab').style.backgroundColor="white";
				  document.getElementById('trainingTab').style.color="#daa520";
 				    document.getElementById('rexperienceTab').style.backgroundColor="white";
				    document.getElementById('rexperienceTab').style.color="#daa520";
			}
			// highlighting the skills tab (dark mode)
			else if($scope.currentTheme == $scope.DARK)
			{
				document.getElementById('skillsTab').style.backgroundColor="#daa520";
				document.getElementById('skillsTab').style.color="black";
				  document.getElementById('trainingTab').style.backgroundColor="black";
				  document.getElementById('trainingTab').style.color="#daa520";
 				    document.getElementById('rexperienceTab').style.backgroundColor="black";
				    document.getElementById('rexperienceTab').style.color="#daa520";
			}
		}

		// if the user clicked on the training tab the training content will be displayed and the skills content hidden
		if(tabValue == $scope.TRAINING)
		{
			$scope.currentExperienceTab = $scope.TRAINING;

			document.getElementById('trainingContent').style.display="block";
			document.getElementById('skillsContent').style.display="none";
			document.getElementById('blankSpace').style.display="none";
			document.getElementById('rexperienceContents').style.display="none";
			
			// highlighting the training tab (light mode)
			if($scope.currentTheme == $scope.LIGHT)
			{
				document.getElementById('trainingTab').style.backgroundColor="#daa520";
				document.getElementById('trainingTab').style.color="white";
				  document.getElementById('skillsTab').style.backgroundColor="white";
				  document.getElementById('skillsTab').style.color="#daa520";
				    document.getElementById('rexperienceTab').style.backgroundColor="white";
				    document.getElementById('rexperienceTab').style.color="#daa520";
			}
			// highlighting the training tab (dark mode)
			else if($scope.currentTheme == $scope.DARK)
			{
				document.getElementById('trainingTab').style.backgroundColor="#daa520";
				document.getElementById('trainingTab').style.color="black";
				  document.getElementById('skillsTab').style.backgroundColor="black";
				  document.getElementById('skillsTab').style.color="#daa520";
				    document.getElementById('rexperienceTab').style.backgroundColor="black";
				    document.getElementById('rexperienceTab').style.color="#daa520";
			}
			
		}
	}


	// This function toggles the theme of the UI between dark and light mode
	$scope.toggleUITheme = function()
	{
		// Changing the theme to DARK MODE
		if($scope.currentTheme == $scope.LIGHT)
		{
			$scope.toggleSwitchName = "icons/toggleOn.svg";
			$scope.currentTheme = $scope.DARK;
			$scope.emailImageSrc = "img/emailDark.png";
			
			document.getElementById("menuBar").style.backgroundColor="#666666";
			document.getElementById("menuBar").style.border="1px solid #666666";

			var menuButtons = document.getElementsByClassName("menuButton");

			// Making all menu buttons dark grey
			for(var i=0;i<menuButtons.length;i++)
			{
				menuButtons[i].style.backgroundColor="#666666";
			}
			
			// Highlighting the menu of the current section in a darker shade of grey
			menuButtons[$scope.currentSection].style.backgroundColor="#454545";

			// background is black
			document.body.style.backgroundColor="#000000";

			// Making all paragraph text light grey
			var paragraphText = document.getElementsByClassName("paragraphText");
			for(var i=0;i<paragraphText.length;i++)
			{
				paragraphText[i].style.color="#f7f7f7";
			}

			// Making all header text white
			var headerText = document.getElementsByClassName("headerText");
			for(var i=0;i<headerText.length;i++)
			{
				headerText[i].style.color="#ffffff";
			}

			// Making all information panels dark grey
			var informationPanels = document.getElementsByClassName("informationPanel");
			for(var i=0;i<informationPanels.length;i++)
			{
				informationPanels[i].style.backgroundColor="#666666";
				informationPanels[i].style.border="1px solid #666666";
			}

			// Making all translucent panels black
			var translucentPanels = document.getElementsByClassName("translucentPanel");
			for(var i=0;i<translucentPanels.length;i++)
			{
				translucentPanels[i].style.backgroundColor="rgba(0, 0, 0, 0.4)";
			}
			
			// Making fullscreen, close and play buttons white
			$scope.fullscreenButtonFile="icons/fullscreenDarkMode.svg";
			$scope.closeButtonFile="icons/close.svg";
			$scope.playButtonFile="icons/playDarkMode.svg";
			
			// Making the main menu buttons suitable for dark mode
			$scope.menuButtonIconFiles = ["icons/profileDark.svg", "icons/projectsDark.svg", "icons/educationDark.svg", "icons/experienceDark.svg"];
			
			// Resetting colour theme of the experience tab (makes the colours match to the current theme)
			$scope.switchExperienceTabs($scope.currentExperienceTab);
		}
		// Changing the theme to LIGHT MODE
		else if($scope.currentTheme == $scope.DARK)
		{
			$scope.toggleSwitchName = "icons/toggleOff.svg";
			$scope.currentTheme = $scope.LIGHT;
			$scope.emailImageSrc = "img/emailLight.png";

			document.getElementById("menuBar").style.backgroundColor="#efefef";
			document.getElementById("menuBar").style.border="1px solid #efefef";
			
			var menuButtons = document.getElementsByClassName("menuButton");

			// making all menu buttons light grey
			for(var i=0;i<menuButtons.length;i++)
			{
				menuButtons[i].style.backgroundColor="#efefef";
			}
			
			// Highlighting the menu of the current section in a darker shade of grey
			menuButtons[$scope.currentSection].style.backgroundColor="#d9d9d9";
			
			// background is white
			document.body.style.backgroundColor="#FFFFFF";

			// Making all paragraph text black
			var paragraphText = document.getElementsByClassName("paragraphText");
			for(var i=0;i<paragraphText.length;i++)
			{
				paragraphText[i].style.color="#000000";
			}

			// Making all header text black
			var headerText = document.getElementsByClassName("headerText");
			for(var i=0;i<headerText.length;i++)
			{
				headerText[i].style.color="#000000";
			}
			
			// Making all information panels light grey
			var informationPanels = document.getElementsByClassName("informationPanel");
			for(var i=0;i<informationPanels.length;i++)
			{
				informationPanels[i].style.backgroundColor="#efefef";
				informationPanels[i].style.border="1px solid #efefef";
			}

			// Making all translucent panels black
			var translucentPanels = document.getElementsByClassName("translucentPanel");
			for(var i=0;i<translucentPanels.length;i++)
			{
				translucentPanels[i].style.backgroundColor="rgba(255, 255, 255, 0.4)";
			}

			// Making the full screen, close and play buttons dark mode
			$scope.fullscreenButtonFile="icons/fullscreen.svg";
			$scope.closeButtonFile="icons/closeBlack.svg";
			$scope.playButtonFile="icons/play.svg";

			// Making the main menu buttons suitable for light mode
			$scope.menuButtonIconFiles = ["icons/profile.svg", "icons/projects.svg", "icons/education.svg", "icons/experience.svg"];

			// Resetting colour theme of the experience tab (makes the colours match to the current theme)
			$scope.switchExperienceTabs($scope.currentExperienceTab);
		}
		
		// Saving the currently selected theme into web storage so that the theme remains when the iCV is reopened
		localStorage.currentTheme = $scope.currentTheme;
	}
	
	// This method is used to set the correct theme (dark or light) on startup
	var initialiseTheme = function()
	{
		if($scope.currentTheme == $scope.DARK){ $scope.currentTheme = $scope.LIGHT; $scope.toggleUITheme(); }
		else if($scope.currentTheme == $scope.LIGHT){ $scope.currentTheme = $scope.DARK; $scope.toggleUITheme(); }
	}
	initialiseTheme();


   // UNIT TESTING
	$scope.unitTestFunction = function()
   {
     //test 1 $scope.switchSection(-1);
     //test 2 $scope.fullscreen(2);
     //test 3 $scope.fullscreenProjectImage(1, 3);
     //test 4 $scope.switchProjectImage(0); alert($scope.currentFullscreenImage);
     //test 5 $scope.switchEducationInstitute(0); alert($scope.currentEducationInstituteNumber);
     //test 6 $scope.skipToEducationInstitute(2);
     $scope.switchExperienceTabs(2);
   }
   // END UNIT TESTING
	

	// This function makes the image the user clicked on fill the browser window and display the fullscreen controls	
	$scope.fullscreenProjectImage = function(projectID, imageNum)
	{
		switch(imageNum)
		{
			case 1: $scope.fullscreenImageFile = $scope.projects[projectID].imageURL1; $scope.currentFullscreenImage = 1; break;
			case 2: $scope.fullscreenImageFile = $scope.projects[projectID].imageURL2; $scope.currentFullscreenImage = 2; break;
			case 3: $scope.fullscreenImageFile = $scope.projects[projectID].imageURL3; $scope.currentFullscreenImage = 3; break;
			case 4: $scope.fullscreenImageFile = $scope.projects[projectID].imageURL4; $scope.currentFullscreenImage = 4; break;
		}
		document.getElementById("fullscreenImageContainer").style.display="block";

		$scope.currentFullscreenProjectID = projectID; // Making note of the project ID of the project currently in fullscreen so that it can be referenced later on
	}
	
	$scope.closeFullscreenImage = function()
	{
		document.getElementById("fullscreenImageContainer").style.display = "none";
	}
	
	// This method runs when the user clicks / taps on the image displayed in full screen to toggle the display of the fullscreen controls
	$scope.hideShowFullscreenControls = function()
	{
		var fullscreenControls = document.getElementsByClassName("fullscreenImageUIElement");
		
		// Hiding all fullscreen controls
		if($scope.fullscreenControlsVisible == true)
		{
			for(var i=0;i<fullscreenControls.length;i++)
			{
			
				fullscreenControls[i].style.visibility = "hidden";
				fullscreenControls[i].style.opacity = "0";
			}
			
			$scope.fullscreenControlsVisible = false; // Indicating that the fullscreen controls are now hidden
			
		}
		// Displaying all fullscreen controls
		else if($scope.fullscreenControlsVisible == false)
		{
			for(var i=0;i<fullscreenControls.length;i++)
			{
				fullscreenControls[i].style.visibility = "visible";
				fullscreenControls[i].style.opacity = "1";
			}
			
			$scope.fullscreenControlsVisible = true; // Indicating that the fullscreen controls are now visible
		}
	}

	// This method increases the size of the date label in the education section so that it displays all date ranges, so that the user can skip to a specific time range
	$scope.expandDateLabel = function()
	{	
		// Enlarging the date label to make room to display all date labels
		document.getElementById("dateLabel").style.height = $scope.DATE_LABEL_OPEN;
				
		// Displaying all date ranges (when the user clicks on one of these date ranges the corresponding institute info is displayed)
		var dateRangeList = document.getElementsByClassName("dateRangeList");
		for(var i=0;i<dateRangeList.length;i++)
		{
			dateRangeList[i].style.visibility = "visible";
			dateRangeList[i].style.opacity = "1";
		}
		
		// Hiding the current date label
		document.getElementById("currentSelectedDate").style.display = "none";
	}
	
	// This method decreases the size of the date label in the education section to only show the selected date range
	$scope.collapseDateLabel = function()
	{
		// Reducing the size of the date label to fit in only one date label
		document.getElementById("dateLabel").style.height = $scope.DATE_LABEL_CLOSED;
				
		// Hiding all date ranges
		var dateRangeList = document.getElementsByClassName("dateRangeList");
		for(var i=0;i<dateRangeList.length;i++)
		{
			dateRangeList[i].style.visibility = "hidden";
			dateRangeList[i].style.opacity = "0";
		}
		
		// Showing only the current date label
		document.getElementById("currentSelectedDate").style.display = "block";
	}

	
	// This method displays the next / previous image of a project while in fullscreen mode
	$scope.switchProjectImage = function(direction)
	{	
		// Decrementing the current fullscreen image variable to indicate that one image to the left is displayed (unless image 1 is displayed)
		if(direction == $scope.LEFT && $scope.currentFullscreenImage > 1){ $scope.currentFullscreenImage -= 1; }
		// Incrementing the current fullscreen image variable to indicate that one image to the right is displayed (unless image 4 is displayed)
		if(direction == $scope.RIGHT && $scope.currentFullscreenImage < 4){ $scope.currentFullscreenImage += 1; }
		
		
		// Depending on the image number the appropriate image URL will be assigned to the img element containing the fullscreen image
		switch($scope.currentFullscreenImage)
		{
			case 1: $scope.fullscreenImageFile = $scope.projects[$scope.currentFullscreenProjectID].imageURL1; break;
			case 2: $scope.fullscreenImageFile = $scope.projects[$scope.currentFullscreenProjectID].imageURL2; break;
			case 3: $scope.fullscreenImageFile = $scope.projects[$scope.currentFullscreenProjectID].imageURL3; break;
			case 4: $scope.fullscreenImageFile = $scope.projects[$scope.currentFullscreenProjectID].imageURL4; break;
		}
	}
	
	// This function is used to run the switch project image function above with arrows keys (i.e. the user can switch images using the keyboard)
	$scope.switchProjectImageWithArrowKeys = function()
	{
		// The functionality will only run when the user has gone into fullscreen image mode
		if(document.getElementById("fullscreenImageContainer").style.display == "block")
		{
			// If the user pressed the LEFT arrow (unicode character code 37) then the switch project image function is run with the left parameter
			if(event.keyCode == 37){ $scope.switchProjectImage($scope.LEFT); }
			// If the user pressed the RIGHT arrow (unicode character code 39) then the switch project image function is run with the right parameter
			else if(event.keyCode == 39){ $scope.switchProjectImage($scope.RIGHT); }
		}
	}
	
	// This function shows the fullscreen button on the image the user hovered their mouse over in an open project
	$scope.showFullscreenButton = function(imageNumber)
	{
		var fullscreenImageButtons = document.getElementsByClassName('fullscreenImageButton');
		fullscreenImageButtons[imageNumber].style.visibility="visible";
	}
	
	// This function hides the fullscreen button on the image the user hovered their mouse over in an open project
	$scope.hideFullscreenButton = function(imageNumber)
	{
		var fullscreenImageButtons = document.getElementsByClassName('fullscreenImageButton');
		fullscreenImageButtons[imageNumber].style.visibility="hidden";
	}

	//			DECLARING DATA STRUCTURES FOR PROFILE SECTION
	$scope.profile={title: "Profile", text: "Since the age of 14 I have been self-taught in Java and other languages (C#, C++, R, PHP and MySQL) and I achieved Distinctions in both first and second years of my BTEC course in Software Development at Gloucestershire College resulting in gaining ‘top student’ award in 2014 and 2015 based on my marks and quality of my assignments. \n\nAfter gaining a scholarship and entry to studying a 4-year Software Engineering degree at Stirling University in 2015, I successfully developed my professional software engineering skills and complimented them with successful grades in business and economics modules.\n\nWhile I have done well academically I have actively put my skills to practice in supporting others and started the first big data sub group within the Stirling University computer club to instruct and educate others on useful programming topics in this area of engineering. In this group, after research and self-directed study, I gave presentations on big data (what it is and what it’s uses are) and demonstrated how to use the ‘R’ programming language for big data and data analysis operations. This has encouraged other students to look more closely into the field of big data and R programming to better appreciate future career options.\n\nFor my fifth semester (3rd Year), I successfully studied abroad in the USA at the University of Northern Iowa (UNI), where I adapted well to the faster pace of work common in US Universities, meaning an increased set of deadlines to meet, increased group work, as well as having to take 4 rather than 3 modules. The outcome of this period of study was that I gained an excellent insight to studying abroad and a greater awareness and appreciation of undertaking a degree as part of a global contingent of students as well as successfully achieving distinctions throughout my modules.\n\nI graduated from Stirling University with a 1st class honours degree in June 2019. During that summer I worked in a summer internship as a Java developer and tester at Sky Subscribers Limited. In September that year I started studying for a one-year taught masters degree in Software Engineering at Southampton University, graduating in November 2020 with a merit. After finishing my masters degree in September 2020 I then started a graduate scheme with Ultra Electronics, and in August 2021 I started my current role as a junior security developer at Bridewell Consulting, where I develop assessment applications for cybersecurity consultants.\n\nI am keen to demonstrate my current programming skills within the workplace applying my strong knowledge of SDLC frameworks on real-world opportunities and from this acquire new skills as well as add value to a future prospective employer in delivering a quality product/service within the computing/software engineering field.", pictureURL: "img/photo.JPG"};

	// 			DECLARING DATA STRUCTURES FOR PROJECTS SECTION
$scope.projects=[

		{projectID: "0", title: "Visual Progress Indicator", text: "During my free time I created an AngularJS web app that allows the user to count down to a certain day in the future using a progress bar, where the end of the progress bar represents the end date and the current length of the progress bar represents the current day (as a percentage of the total days until the end date). You can also plot milestones on this progress bar, indicating days in the future that occur before the end date and indicate some sort of milestone along the way.<br><br> This web app implements responsive design, and so as you can see from the screenshots the web app changes the setup window depending on how big the screen is, making it fill the screen on smaller devices. This web app also uses HTML 5 web storage to store the user input so that the progress bar retains it's state whenever the user reloads the browser or closes and reopens the browser.", previewText: "During my free time I created an AngularJS web app that allows the user to count down to a certain day in the future using a progress bar, where the end of the progress bar represents the end date and the current length of the progress bar represents the current day (as a percentage of the total days until the end date). You can also plot milestones on this", imageURL1: "img/milestones1.png", imageURL2: "img/milestones2.png", imageURL3: "img/milestones3.png", imageURL4: "img/milestones4.png", downloadLink: "projects/"},
		
{projectID: "1", title: "Supply Chain Management - Honours Project", text: "For my bachelors honours project I created an application that predicts future demand for supplies within a supply chain based on previous sales data. It does this using recurrent neural networks and genetic algorithms to learn from the past sales data given to it by the user, and improves predictions over time.<br><br>In order to create a prediction with the software the first step is to create a product record representing some type of stock, i.e. wood, steel, window frames. The next step is to import sales data for a product, which will be stored in CSV format. After the sales data is imported it is associated with the selected product and a prediction for the future demand (i.e. product demand for next month) is produced. The recurrent neural network and genetic algorithm mechanisms work automatically in the background and are hidden from the user, unlike other applications which requires the user to have background knowledge in this field.<br><br>The entire application is written from scratch in Java, including the machine learning functionality (i.e. No machine learning libraries were used). In order to develop the application I followed the waterfall software development methodology, as the requirements were well known in advance and not subject to change, and the entire application had to be complete by a strict deadline. I used the JUnit testing framework to extensively unit test the application before integration, in which I tested the functionality as a whole. The application was deployed as a runnable .JAR file that runs as a desktop application (Windows, macOS, Linux).", previewText: "For my bachelors honours project I created an application that predicts future demand for supplies within a supply chain based on previous sales data. It does this using recurrent neural networks and genetic algorithms to learn from the past sales data given to it by the user, and improves predictions over time. In order to create a prediction with the software the first step is to create a product record representing some type of stock, i.e. wood, steel, window frames. The next step is to ", imageURL1: "img/dissertation1.png", imageURL2: "img/dissertation2.png", imageURL3: "img/dissertation3.png", imageURL4: "img/dissertation4.png", downloadLink: "projects/"},

		{projectID: "2", title: "Responsive Website", text: "For the web application development module (CS3110) I created a website with it's own content management system to allow users to create posts and comments. The purpose of the website is to allow users to browse and discuss ski resorts, where each ski resort has it's own page that users can post on. <br><br>I used the Bootstrap framework and CSS media queries to make the website responsive, meaning that it adjusts the UI to fit the window size of the user's browser. For example, the image at the very top shows what the homepage looks like in a small browser window, but if you look at the image below it shows what the homepage looks like in a larger browser window, where all four icons are displayed on the same row to make use of the wider window. <br><br>You can also see this responsive design in the bottom two images, where one of them shows what an entry page looks like on a desktop browser window, and the image at the very bottom shows what that same page would look like on a browser window the size of a mobile device.", previewText: "For the web application development module (CS3110) I created a website with it's own content management system to allow users to create posts and comments. The purpose of the website is to allow users to browse and discuss ski resorts, where each ski resort has it's own page that users can post on. I used the Bootstrap framework and CSS media queries to make the website responsive, meaning that it adjusts the UI to fit the window size of the user's browser. ", imageURL1: "img/index1.png", imageURL2: "img/index2.png", imageURL3: "img/entry1.png", imageURL4: "img/entry2.png", downloadLink: "projects/"},

		{projectID: "3", title: "Air Traffic Control Simulator", text: "For the software engineering 2 module (CSCU9P6) I collaborated on a group project in a team of 4 to create an air traffic control simulator, where my role was to create the UI and core functionality for the simulated airport gates using subversion (SVN) to manage changes to and promote code when ready for live distribution. The project was written in Java and used the Spring framework to create the GUI front end. This project was built based on UML diagrams such as state charts. <br><br>The software was tested using the JUnit testing framework, where I tested the code that other team members had produced and vice versa in order to detect bugs in the code. The project implemented the model-view-controller architecture, where the data is held separate from the view and the user controls, allowing the user-facing front end to be updated in realtime as the data was modified.", previewText: "For the software engineering 2 module (CSCU9P6) I collaborated on a group project in a team of 4 to create an air traffic control simulator, where my role was to create the UI and core functionality for the simulated airport gates using subversion (SVN) to manage changes to and promote code when ready for live distribution. The project was ", imageURL1: "img/atc1.png", imageURL2: "img/atc2.png", imageURL3: "img/atc3.png", imageURL4: "img/atc4.png", downloadLink: "projects/"},

		{projectID: "4", title: "Web Login System", text: "For the communications and networking module (CSCU9W6) I created a fully functional login system which allows users to create an account and securely login with it. This login system uses PHP and MySQL on the backend and JavaScript and AJAX on the front end for functionality.", previewText: "For the communications and networking module (CSCU9W6) I created a fully functional login system which allows users to create an account and securely login with it. This login system uses PHP and MySQL on the backend and JavaScript and AJAX on the front end for functionality.", imageURL1: "img/login1.png", imageURL2: "img/login2.png", imageURL3: "img/login3.png", imageURL4: "img/login4.png", downloadLink: "projects/"}

		];

	//			DECLARING DATA STRUCTURES FOR THE EDUCATION SECTION
$scope.institutes=[
{id: "0", name: "Southampton University", moduleAndGrade: ["<b>MSc in Software Engineering</b><br>",
"Software Project Management & Secure Development (COMP6204) - Merit (55/100)",
"Software Modelling Tools (COMP6226) - Merit (56/100)",
"Cloud Applications (COMP6244) - Merit (63/100)",
"Machine Learning Technologies (COMP6246) - Merit (64/100)",
"E-Business Strategy (COMP6201) - Merit (60/100)",
"Semantic Web Technologies (COMP6215) - Pass (45/100)",
"Project Preparation (ELEC6211) - Merit (65/100)",
"Automated Code Generation (COMP6209) - Pass (45/100)",
"Dissertation Project (COMP6200) - Distinction (70/100)"], imageURL: "img/soton.jpg", footnote: ""},
		  {id: "1", name: "Stirling University", moduleAndGrade: ["<b>BSc Honours in Software Engineering</b><br>",
"<b>4th Year Modules</b><br>",
"NoSQL Databases (CSCU9YQ) – Distinction (80/100)",
"Honours Project (CSCU9Z7) – Distinction (74/100)",
"Web Services (CSCU9YW) – Distinction (72/100)",
"Operating Systems Concurrency and Distribution (CSCU9V5) – Distinction (84/100)",
"Mobile Application Development (CSCU9YH) – Distinction (77/100)",
"Technologies for Ecommerce (CSCU9YD) – Distinction (85/100)",
"<b>3rd Year Modules</b><br>",
"Software Engineering 2 (CSCU9P6) - Distinction (86/100)",
"Communications and Networking (CSCU9W6) - Distinction (78/100)",
"Information Systems (CSCU9T6) - Distinction (76/100)",
"UI Design, Implementation, and Evaluation (CS3120) – Distinction (3.67/4)*", "Software Engineering (CS2720) – Distinction (4/4)*","Web Application Development (CS3110) – Distinction (4/4)*","Database Systems (CS3140) – Distinction (4/4)*","<b>2nd Year Modules</b><br>","Data Structures & Algorithms (CSCU9A3) – Distinction (88/100)","Introductory Microeconomics (ECNU111) – Distinction (98/100)","The Global Business Environment (MGTU9S1) – Distinction (75/100)","Managing Information (CSCU9T4) – Distinction (72/100)","Systems (CSCU9V4) – Merit (61/100)","Programming Language Paradigms (CSCU9Y4) – Distinction (87/100)","<b>1st Year Modules</b><br>","Computer Science (CSCU9A1) – Distinction (88/100)","Discrete Structures (MATU9D1) – Distinction (84/100)","Mathematics 1 (Pure Maths) (MATU9M1) – Pass (55/100)","Programming and UI Design (CSCU9A2) – Distinction (81/100)","Practical Statistics (MATU9D2) – Distinction (74/100)","Making the Most of the World Wide Web (CSCU9B2) – Distinction (87/100)"], imageURL: "img/stir.jpg", footnote: "*5th Semester grades are based on the American grade system after studying at University of Northern Iowa, and so the grades show marks out of 4 and not 100"},
		  {id: "2", name: "Gloucestershire College", moduleAndGrade: ["<b>BTec Level 3 Software Development</b><br>", " DDD* (Triple Distinction Star)", "<b>AQA AS Level Mathematics</b><br>", "Decision and Core 1 & 2 Mathematics - D (2014)"], imageURL: "img/glos.jpg", footnote: ""},
		  {id: "3", name: "Cheltenham Bournside School", moduleAndGrade: ["Mathematics - Grade A", "Physics - Grade B", "English Language - Grade B", "English Literature - Grade C", "Biology - Grade C", "Geography - Grade C"], imageURL: "img/bournside.jpg", footnote: ""}
		  ];

	//			DECLARING DATA STRUCTURES FOR THE EXPERIENCE SECTION
	$scope.skills = {text: "Adam’s key areas of technical expertise are:<ul><li>Adaptable at learning new programming languages i.e. Java, R, PHP, MySQL, JavaScript + HTML + CSS</li><li>Application of Waterfall and RAD / Agile frameworks for SDLC when modelling programs.</li><li>Application of JavaScript, HTML, CSS and AngularJS to develop web applications</li><li>Strong knowledge of designing and testing graphical and command line programs and using SVN to manage changes and promoting code for delivery.</li><li>Over 12 years’ experience in developing in-house programs using modern programming languages since the age of 14</li></ul>Adam’s key personal skills are:<ul><li>Positive team worker with an eye for detail when developing and designing software programs</li><li>Attention to detail when designing and writing programs (best practice commenting is followed)</li><li>Excellent document presentation skills when designing and communicating programs</li><li>Strong work ethic (Completer/Finisher)</li><li>Excellent problem-solving skills when identifying and overcoming programming errors</li><li>Work closely with my peers to meet and surpass objectives and assist them in their tasks</li><li>Always delivers University assignments ahead of delivery deadlines</li></ul>"};

	$scope.training = {text: "<ul><li>R Programming for Data Analysis</li><li>Visual Studio 2022</li><li>Notepad++ (to support PHP code development)</li><li>Ecommerce Technologies</li><li>XAMPP</li><li>JIRA for Issue Tracking & Project Management</li><li>HCI</li><li>AppleScript scripting language for automating processes</li><li>Adobe Fireworks for designing program graphics</li><li>Project Planning and Software Development Methodologies (both waterfall and agile)</li><li>AngularJS for building single page web applications</li></ul>"};
	
	$scope.recentExperience = [{header: "Software Engineer Internship at Sky", date: "Summer 2019", text: "Between June to August 2019 I worked as an intern for Sky Subscribers Limited. During the internship I learnt about the technologies used to build service software and the processes involved in delivering software, i.e. kanban boards, Jira. I specifically worked in a team building tests for a component of the software in Java, using the JUnit testing framework. Although I used git before in two university projects I became more familiar with using git during this internship as I used in on a regular basis to merge code to the main repository, and so I feel that this has prepared me for future internships and jobs. Overall this internship has taught me how software engineering works in the real world, and I have gained programming and software engineering skills that are important in the workplace.", imageURL1: "img/sky.jpg", imageURL2: "img/kanban.jpg"}];


}
	
	
);