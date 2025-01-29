<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$description = $data['description'];

if (!empty($title) && !empty($description)) {
    $stmt = $conn->prepare("INSERT INTO tasks (title, description) VALUES (:title, :description)");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->execute();

    echo json_encode(['message' => 'Task created successfully']);
} else {
    echo json_encode(['message' => 'Title and description are required']);
}
?>