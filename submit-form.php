<?php
if($_POST) {
    $to = "storegarden7@gmail.com"; // E-postadressen du vill skicka formuläret till
    $subject = "Nytt formulär skickat";
    $message = "Namn: " . $_POST['firstname'] . "\n";
    $message .= "Ämne: " . $_POST['country'] . "\n";
    $message .= "Meddelande: " . $_POST['subject'] . "\n";
    $headers = "From: " . $_POST['firstname'] . "\r\n";

    mail($to, $subject, $message, $headers);
}
?>