<?php
function getDbAccess()
{
    return new DatabaseAccess("pzidb_lbanek19", "pzi_lbanek19", "g8gl2g4fh6DJ");
}

class DatabaseAccess
{
    private $_username;
    private $_password;
    private $_db;
    private $_connection;

    public function DatabaseAccess($db, $username, $password)
    {
        $this->_db = $db;
        $this->_username = $username;
        $this->_password = $password;
    }

    public function executeQuery($query)
    {
        $connection = mysqli_connect("localhost", $this->_username, $this->_password);

        if ($connection) {
            $database = mysqli_select_db($connection, $this->_db);

            if ($database) {
                mysqli_query($connection, 'SET character_set_results=utf8');
                mysqli_query($connection, 'SET character_set_client=utf8');
                mysqli_query($connection, 'SET names utf8');

                $queryResponse = mysqli_query($connection, $query);

                if (!$queryResponse) {
                    $message  = 'Invalid query: ' . mysqli_error($queryResponse) . "\n";
                    $message .= 'Whole query: ' . $query;
                    die($message);
                }

                $resultItems = array();

                while ($item = mysqli_fetch_assoc($queryResponse)) {
                    $resultItems[] = $item;
                }

                return  $resultItems;
            } else {
                die("Connection to DB could not be established");
            }
        } else {
            die("Connection failed: " . mysqli_connect_error());
        }
    }

    public function executeInsertQuery($query)
    {
        $connection = mysqli_connect("localhost", $this->_username, $this->_password);

        if ($connection) {
            $database = mysqli_select_db($connection, $this->_db);

            if ($database) {
                mysqli_query($connection, 'SET character_set_results=utf8');
                mysqli_query($connection, 'SET character_set_client=utf8');
                mysqli_query($connection, 'SET names utf8');

                $queryResponse = mysqli_query($connection, $query);

                if (!$queryResponse) {
                    $message  = 'Invalid query: ' . mysqli_error($queryResponse) . "\n";
                    $message .= 'Whole query: ' . $query;
                    die($message);
                }

                return mysqli_insert_id($connection);
            } else {
                die("Connection to DB could not be established");
            }
        } else {
            die("Connection failed: " . mysqli_connect_error());
        }
    }
}
