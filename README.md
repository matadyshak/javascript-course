This program contains all the HTML, CSS and Javascript to build a website from scratch that mimics the 
Amazon website.  The code originated from the tutorial "JavaScript Tutorial Full Course - Beginner 
to Pro (2024)" from SuperSimpleDev on YouTube.  All 250 or so exercises were coded and working with 
very little reference to the provided solution code. In my repository, my code is under the 
"3-my-exercise-solutions" folder.  The main branch was used when entering the code during the video 
presentations (Lessons 1-18).  Separate branches were used when completing the exercises at the end 
of each lesson, such as branch "18-exercises".  After each lesson's exercises were completed and 
working the code was merged back into the "main" branch. 

OVERVIEW

1. Developoment was done using the Microsoft VS Code.
2. Live Server extension for VS Code used to run the code
3. Program is compatible with Google Chrome
4. Imported the Jasmine test framework and wrote 27 test cases
5. Makes use of the the SuperSimpleDev backend server and asynchronous code

SETUP VS CODE 

1. Select the folder to run the latest version of the code:
   In VS Code:  File > Open Folder 
2. Browse to  Javascript-course\3-my-exercise-solutions\lesson-18
3. Click "Select Folder" button


RUNNING THE TEST CASES IN VS CODE

1. Click the File Explorer icon and open the "tests" folder
2. Click on "tests.html"
3. R-Click "Open with Live Server"

RUNNING THE MAIN PROGRAM IN VS CODE

1. Click the File Explorer icon and open the "LESSON-18" folder
2. Click on file "amazon.html"
3. R-Click "Open with Live Server"

MAIN PAGE - AMAZON.HTML

You can enter search text to search for specific products.  The search string is converted
to an array of words so searching for "socks shoes" will bring up anything that matches
"socks" or "shoes" and the search string is added as a URL "search" parameter. For each product 
there is a drop-down to select a quantity of 1-10, along with an image, description, ratings 
and price.  Add products to the cart by clicking the Add to Cart button below the product.  
Click the "Cart" button to go to the cart or click the "Returns & Orders" button to go to
the orders page.

CHECKOUT PAGE (CART PAGE)

The border at the top displays the total count of items in the cart.  If the cart is empty,
a "Your cart is empty" message is displayed with a "View Products" button which brings 
you back to the Amazon page, and the "Place your order" button will be disabled.

When there are items in the cart, for each product the following items are displayed:

Delivery Date
Product Image
Product Description
Price
Quantity
Delivery Option (1, 3 or 7 days not counting Saturdays or Sundays)

There is an "Update" link which makes a quantity input box appear into
which you can type a quantity of 1-999.  All other characters are ignored.
Click the "Save" link to update to the quantity that was typed.

Each product also has a "Delete" link which removes the product from
the cart.

The Order Summary contains the following data:

Total number of items
Cost of the items
Shipping Cost
Total Before Tax
Tax (10%)
Order Total Amount

The "Place your order" button causes a request to the back-end server to
receive cart data and respond with the order information.

ORDERS PAGE

The orders are saved in local storage and are retained after the program is ended.
To delete the orders, type this in the Chrome console:

localStorage.clear('orders')

Each order has a header containing:

Date order was placed
Total amount of the order
Unique order ID

For each product in the order:

Product image
Product description
Arrival date
Quantity

Once the order has been created the contents of the cart is deleted.
With each product in an order is a "Buy it again" button which adds
the item back into the cart with quantity=1 and free shipping each
time you click the button.

Each product in an order also has a "Track package" button which
creates URL parameters for the Order ID and the Product ID and
takes you to the Tracking Page

The search bar also works from the Orders Page and takes you
back to the amazon page with a URL "search" parameter.

TRACKING PAGE

The tracking page has URL parameters for the Order ID and the 
Product ID. This page contains the following:

View all orders link - Takes you to the Orders page.
Delivery Date
Product description
Quantity
Product image
Progress bar: Indicates 0 - 100% completion of the order.  
"Preparing" label shown in green for 0-50% completion.
"Shipped" label shown in green for >50% and <100% completion.
"Delivered" label shown in green for 100% completion

The search bar also works from the Tracking Page and takes you
back to the amazon page with a URL "search" parameter.

