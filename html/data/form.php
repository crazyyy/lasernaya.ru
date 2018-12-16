<?php
  header('Content-Type: text/plain');
  date_default_timezone_set('Europe/Moscow');
  // // User settings
  $to = "sales@technix74.ru";
  $subject = "Форма: Заказать звонок";

  $form_data = $_POST['form'];
  // var_dump($_POST['form']);

  $name = $form_data['10001'];
  $name  = htmlspecialchars($name); // обрабатываем
  $phone = $form_data['10002'];
  $mail = $form_data['56241'];
  $mail2 = $form_data['41015'];

  $dt=date("d F Y, H:i:s"); // дата и время

  $email="info@technix74.ru"; // e-mail откуда письмо

  $mess.="Имя: $name\n";
  $mess.="Телефон: $phone\n";
  $mess.="Почта: $mail2 $mail\n";
  $mess .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
  $mess .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];

  $headers = "From: $email\n";
  $headers .= "X-Mailer: PHP/SimpleModalContactForm\n";
  $headers .= "MIME-Version: 1.0\n";
  $headers .= "Content-type: text/plain; charset=utf-8\n";
  $headers .= "Content-Transfer-Encoding: quoted-printable\n";
  mail($to, $subject, $mess, $headers); // отправляем



  // var_dump($_POST['form']);
  exit();




// var_dump($_POST['form']);


// if(@$_POST["hidden"]) {
//     $dt=date("d F Y, H:i:s"); // дата и время

//     $fnm=$_POST["name"];
//     $fnm=htmlspecialchars($fnm); // обрабатываем


//     $email="info@net-komaroff.ru"; // e-mail откуда письмо

//     $phone=$_POST["phone"];

//     $mess.="Имя: $fnm\n";
//     $mess.="Телефон: $phone";
//     $mess .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
//     $mess .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];

//     $headers = "From: $email\n";
//     $headers .= "X-Mailer: PHP/SimpleModalContactForm\n";
//     $headers .= "MIME-Version: 1.0\n";
//     $headers .= "Content-type: text/plain; charset=utf-8\n";
//     $headers .= "Content-Transfer-Encoding: quoted-printable\n";
//     mail($to, $subject, $mess, $headers); // отправляем
// }

?>
