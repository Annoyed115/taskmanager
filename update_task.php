<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$title = $data['title'];
$description = $data['description'];

if (!empty($id) && !empty($title) && !empty($description)) {
    $stmt = $conn->prepare("UPDATE tasks SET title = :title, description = :description WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->execute();

    echo json_encode(['message' => 'Task updated successfully']);
} else {
    echo json_encode(['message' => 'All fields are required']);
}
?>