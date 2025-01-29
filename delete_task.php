<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

if (!empty($id)) {
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    echo json_encode(['message' => 'Task deleted successfully']);
} else {
    echo json_encode(['message' => 'Task ID is required']);
}
?>