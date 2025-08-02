<?php
// Import the PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// The path is now simpler because we removed "-master" from the folder name
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// We only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $mail = new PHPMailer(true);

    try {
        // --- SERVER SETTINGS (CONFIGURE THIS SECTION) ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'shantanuraj931@gmail.com'; // **YOUR GMAIL ADDRESS**
        $mail->Password   = 'Shaan@@8789';      // **YOUR GMAIL APP PASSWORD**
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // --- RECIPIENTS (CONFIGURE THIS SECTION) ---
        $mail->setFrom('shantanuraj931@gmail.com', 'Your Website Contact Form');
        $mail->addAddress('shantanuraj931@gmail.com', 'Your Name'); // **THE EMAIL WHERE YOU WANT TO RECEIVE MESSAGES**
        
        // --- CONTENT ---
        $userName = htmlspecialchars($_POST['name']);
        $userEmail = htmlspecialchars($_POST['email']);
        
        $mail->isHTML(true);
        $mail->Subject = 'New Message from Website Contact Form: ' . $userName;
        $mail->Body    = "You have received a new message from your website contact form.<br><br>".
                         "<b>Name:</b> " . $userName . "<br>" .
                         "<b>Email:</b> " . $userEmail . "<br>" .
                         "<b>Contact:</b> " . htmlspecialchars($_POST['contact']) . "<br>" .
                         "<b>Message:</b><br>" . nl2br(htmlspecialchars($_POST['message']));
        
        $mail->send();
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Message has been sent successfully!']);

    } catch (Exception $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }

} else {
    http_response_code(403);
    echo "403 Forbidden - You are not allowed to access this page.";
}
?>
