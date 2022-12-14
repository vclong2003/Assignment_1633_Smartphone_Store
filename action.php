<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smartphonestoredb";

function customQuery($query)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("$query");
    $conn->close();
    echo json_encode("Query sent!");
}
function addData($query)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("$query");
    $conn->close();
    echo json_encode("done");
}

function fetchAllProducts()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `product`.*, `brand`.`brandName` FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` ORDER BY `product`.`Price` DESC;");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
}
function fetchAllCategories()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `category`.*, COUNT(`product`.`productID`) as quantity FROM `category` LEFT JOIN `product`ON `category`.`catID` = `product`.`catID` GROUP BY `category`.`catID`;");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
}
function fetchAllBrands()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `brand`.*, COUNT(`product`.`productID`) as quantity FROM `brand` LEFT JOIN `product`ON `brand`.`brandID` = `product`.`brandID` GROUP BY `brand`.`brandID`");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
}
function fetchSingleProduct($id)
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `product`.*, `brand`.`brandName`, `category`.`categoryName` FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` INNER JOIN `category` ON `product`.`catID` = `category`.`catID` WHERE `product`.`productID` = $id");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_assoc($result));
    }
    $conn->close();
}
function addProduct($catID, $brandID, $Name, $smallDescription, $Description, $thumbnailUrl, $imageUrl, $Price, $quantity)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("INSERT INTO `product`(`catID`, `brandID`, `Name`, `smallDescription`, `Description`, `thumbnailUrl`, `imageUrl`, `Price`, `quantity`) VALUES ('$catID', '$brandID', '$Name', '$smallDescription', '$Description', '$thumbnailUrl',' $imageUrl', '$Price', '$quantity')");
    $conn->close();
    echo json_encode("done");
}
function addCategory($catName)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("INSERT INTO `category`(`categoryName`) VALUES ('$catName')");
    $conn->close();
    echo json_encode("done");
}
function updateCategory()
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("");
    $conn->close();
    echo json_encode("done");
}
function addBrand($brandName, $desc)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("INSERT INTO `brand`(`brandName`, `Description`) VALUES ('$brandName', '$desc')");
    $conn->close();
    echo json_encode("done");
}
function addItemToCart($email, $productID)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("INSERT INTO `cart`(`email`, `productID`) VALUES ('$email','$productID')");
    $conn->close();
    echo json_encode("Query sent!");
}
function fetchCartItems($email)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `cart`.*, `product`.*, `brand`.`brandName` FROM `cart` INNER JOIN `product` ON `product`.`productID` = `cart`.`productID` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` WHERE `cart`.`email` = '$email'");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
}
function removeCartItem($email, $productID)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("DELETE FROM `cart` WHERE `email` = '$email' AND `productID`= '$productID'");
    $conn->close();
    echo json_encode("Query sent!");
}
function checkCartItemExistance($email, $productID)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT COUNT(*) as `count` FROM `cart` WHERE email = '$email' AND productID = '$productID'");
    echo json_encode(mysqli_fetch_assoc($result));
    $conn->close();
}
if ($_POST['functionname'] == "customQuery") {
    customQuery($_POST['query']);
} else if ($_POST['functionname'] == "addData") {
    addData($_POST['query']);
} else if ($_POST['functionname'] == 'fetchAllProducts') {
    fetchAllProducts();
} else if ($_POST['functionname'] == 'fetchAllCategories') {
    fetchAllCategories();
} else if ($_POST['functionname'] == 'fetchAllBrands') {
    fetchAllBrands();
} else if ($_POST['functionname'] == 'fetchSingleProduct') {
    fetchSingleProduct($_POST['productID']);
} else if ($_POST['functionname'] == 'addProduct') {
    addProduct($_POST['catID'], $_POST['brandID'], $_POST['Name'], $_POST['smallDescription'], $_POST['Description'], $_POST['thumbnailUrl'], $_POST['imageUrl'], $_POST['Price'], $_POST['quantity']);
} else if ($_POST['functionname'] == 'addCategory') {
    addCategory($_POST['catName']);
} else if ($_POST['functionname'] == 'addBrand') {
    addBrand($_POST['brandName'], $_POST['desc']);
} else if ($_POST['functionname'] == 'addItemToCart') {
    addItemToCart($_POST['email'], $_POST['productID']);
} else if ($_POST['functionname'] == 'fetchCartItems') {
    fetchCartItems($_POST['email']);
} else if ($_POST['functionname'] == 'removeCartItem') {
    removeCartItem($_POST['email'], $_POST['productID']);
} else if ($_POST['functionname'] == 'checkCartItemExistance') {
    checkCartItemExistance($_POST['email'], $_POST['productID']);
}