<?php
$email = $_REQUEST['Email'];
$to = 'buttsstudios@gmail.com';
$fname = $_REQUEST['First-Name'];
$lname = $_REQUEST['Last-Name'];
$phone = $_REQUEST['Contact-Phone-Number'];
$message = $_REQUEST['Message'];
$subject = 'Contact submission from '.$fname;
$message = '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"><head>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width">
<title>Butts Studios Contact</title>
<style>
    @media only screen {
        html {
            min-height: 100%;
            background: #1d1d1d
        }
    }

    @media only screen and (max-width:840px) {
        .small-float-center {
            margin: 0 auto !important;
            float: none !important;
            text-align: center !important
        }
    }

    @media only screen and (max-width:840px) {
        table.body img {
            width: auto;
            /* height: auto */
        }

        table.body center {
            min-width: 0 !important
        }

        table.body .container {
            width: 95% !important
        }

        table.body .columns {
            height: auto !important;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding-left: 40px !important;
            padding-right: 40px !important
        }

        table.body .columns .columns {
            padding-left: 0 !important;
            padding-right: 0 !important
        }

        table.body .collapse .columns {
            padding-left: 0 !important;
            padding-right: 0 !important
        }

        th.small-6 {
            display: inline-block !important;
            width: 50% !important
        }

        th.small-12 {
            display: inline-block !important;
            width: 100% !important
        }

        .columns th.small-12 {
            display: block !important;
            width: 100% !important
        }

        table.menu {
            width: 100% !important
        }

        table.menu td,
        table.menu th {
            width: auto !important;
            display: inline-block !important
        }

        table.menu.vertical td,
        table.menu.vertical th {
            display: block !important
        }

        table.menu[align=center] {
            width: auto !important
        }
    }
</style>
</head>

<body style="-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box;color:#fefefe;font-family:\'Work Sans\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif,\'Apple Color Emoji\',\'Segoe UI Emoji\',\'Segoe UI Symbol\';font-size:16px;font-weight:400;line-height:1.4;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important">From: '.$fname.' '.$lname.'
<br>
Email: '.$email.'
<br>
Phone: '.$phone.'
<br>
Message: '.$message.'
<br>
</body></html>';


//parse message
$string = $message;
$message = delete_all_between('"<', '>"', $string);
echo $message;

//////////////////////////////////////////////////////////

$headers = "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers.= 'From: <team@buttsstudios.com>' . "\r\n";

$send_email = mail($to,$subject,$message,$headers);

echo ($send_email) ? 'success' : 'error';

function delete_all_between($beginning, $end, $string) {
  $beginningPos = strpos($string, $beginning);
  $endPos = strpos($string, $end);
  if ($beginningPos === false || $endPos === false) {
    return $string;
  }

  $textToDelete = substr($string, $beginningPos, ($endPos + strlen($end)) - $beginningPos);

  return delete_all_between($beginning, $end, str_replace($textToDelete, '', $string)); // recursion to ensure all occurrences are replaced
}
  
  
?>
