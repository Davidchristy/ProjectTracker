# ProjectTracker
A Project tracker system allowing you to track different stages.

In reality this is a project I'm doing to help me learn
Node and React. I'm hoping what I build here can also be used 
in a few other projects I've been thinking about but should 
start somewhere. If you find this let me know what you think.  

# Functional Spec  (TODO) 
* Log in system
    * Create new accounts -- DONE as of 08/20/20
    * Encrypt password
    * Lock whole system if not allowed DONE as of 08/19/20
    * New Users must be allowed by Admin User
        * Admin page has a section to confirm new users
    * Uses JWT key to securely communicate to server -- DONE
    

* Kanban board
    * Users can create many boards, users should be allowed to pick
     what boards they want to look at from allowed list of boards. 
        * Board admins can give people permission to look at other boards
        * Site Admins can look at all boards (FOR NOW)
    * Swim lanes, Users can make different swim-lane for cards to follow on
    * If a card's time limit is up move to top swim-lane (priority?)
    * Users can click and drag cards from or to any column or lane 
        * When this happens pop up something if move needs something or doesn't make sense  
    * 
  
* Task Cards
    * Cards can have different types
        * TODO
        * Bug
        * Feature
        * Project 
            * This can have "children" cards
    * Each type of card is a different color
        * This can be user set, but for now it's wont be
    * Cards should have a start date/time (default today)
    * Cards should have an estimated time to complete each column (not needed) 
        * Should auto generate an end date WHEN moved into that column
    * Cards should keep a history of change
    * Cards should have a list of optional items needed to complete the task
        * Computer
        * Be at store/office/etc
    * Cards should have a "Current Owner" of card 
        * Default to current user
        * This can wait until "multi-user" becomes more of a thing
    * Cards should have many views
        * Micro view: Title, type (based on color of card?)
        * Collapsed View: A title, todo date (if applied), and first 100 chars of long description
        * Full View: Everything?

* Upload Documents
* Sprint Boards
* UI interaction of kanban columns
* Sprint planning board
* Push Sprint data **somewhere**
* Separate out necessary data with data that should be made
 by each user, so we can blow this out to allow other 
 instances to be made.
 
 * 404 Page

# Timeline

##### 08/17/20-08/23/19: 
* Log in system
    * REST API for interaction
    * Bootstrap3 for UI
    * MySQL starter design
    
##### 08/24/20-08/30/19:
* Todo List to choose from
    * Build out different todo card types 
* Kanban Board designed

##### 08/31/20-08/6/19:
* Sprint board
* Push Data Out


# Tech stack
React as the front end with Node/Express for the backend API.
I'll be using MySQL as the Database. 
Update: I have switched to using TypeScript in the front end
and will make the backend typescript as well later

I haven't given it a lot of thought, but I'm thinking I'll host 
on a tiny EC2 AWS instance. I'll probably put all this into a 
Docker container so easily port it. 