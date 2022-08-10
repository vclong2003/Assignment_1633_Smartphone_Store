<?php
header('Content-Type: application/json');

function queryMySql($tableName)
{
    $arr = array();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM $tableName";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    } else {
        echo "0 results";
    }
    $conn->close();
    echo json_encode($arr);
}

function addNewBrand($brandName, $brandDescription)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($brandDescription == "") {
        $sql = "INSERT INTO `brand`(`brandName`) VALUES ('$brandName')";
    } else {
        $sql = "INSERT INTO `brand`(`brandName`, `Description`) VALUES ('$brandName', '$brandDescription')";
    }
    $conn->query($sql);
    $conn->close();
}

function addNewCategory($categoryName)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO `category`(`categoryName`) VALUES ('$categoryName')";

    $conn->query($sql);
    $conn->close();
}

if ($_POST['functionname'] == "queryMySql") {
    queryMySql($_POST['tableName']);
} else if ($_POST['functionname'] == "addNewBrand") {
    addNewBrand($_POST['brandName'], $_POST['brandDescription']);
} else if ($_POST['functionname'] == "addNewCategory") {
    addNewCategory($_POST['categoryName']);
}