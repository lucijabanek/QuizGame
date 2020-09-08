<?php

require_once("./DatabaseAccess.php");

function processRequest()
{
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    switch ($requestMethod) {
        case 'GET':
            $HighScores = getHighScoreFromDb();
            showJSONresponse(true, "OK", $HighScores);
            break;

        case 'POST':
            $Name = getRequestParameter("Name");
            $HighScore = getRequestParameter("HighScore");
            if (isset($Name) && ($Name !== '') && isset($HighScore) && ($HighScore !== '')) {
                $newHighScoreId = addHighScoreToDb($Name, $HighScore);
                showJSONresponse(true, "OK", $newHighScoreId);
            } else {
                showJSONresponse(false, "Bad parameters", null);
            }
            break;

        default:
            showJSONresponse(false, "Unknown request method: $requestMethod", null);
            break;
    }
}

function getHighScoreFromDb()
{
    return getDbAccess()->executeQuery("SELECT * FROM HighScores ORDER BY HighScore DESC LIMIT 5;");
}

function addHighScoreToDb($Name, $HighScore)
{
    return getDbAccess()->executeInsertQuery("INSERT INTO HighScores (Name, HighScore) VALUES ('$Name', '$HighScore')");
}

function showJSONresponse($success, $message, $data)
{
    echo (json_encode(array(
        "success" => $success,
        "message" => $message,
        "data" => $data
    )));
}

function getRequestParameter($key)
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data[$key])) {
        return $data[$key];
    } else {
        return isset($_REQUEST[$key]) ? $_REQUEST[$key] : "";
    }
    return "";
}

processRequest();
