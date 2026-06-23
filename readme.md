# Implementasi Redux

## tampilan ini adalah todo list yang menggunakan redux

## Screenshot:
<table>
    <tr>
        <td>
            <img src='src/img/image.png'>
        </td>
        <td>
            <img src='src/img/localhost_5174_ (1).png'>
        </td>
        <td>
            <img src='src/img/localhost_5174_ (2).png'>
        </td>
    </tr>
    <tr>
        <td>
            Contoh halaman
        </td>
        <td>
            Implementasi Desain
        </td>
        <td>
            Screenshoot Input data dengan modal
        </td>
    </tr>
</table>


Pada tampilan ini merupakan tampilan todo list, dengan memanfaatkan penyimpanan store pada redux, dan di store penyimpanan juga dilakukan di local storage dengan menggunakan redux-persist. untuk fitur slice pada reducers todo ada addTask, editTask, removeTask, resetTask, dan moveTask.

untuk alurnya kita input list akan masuk ke bagian todo terlebih dahulu, ketika di ceklist akan berpindah ke bagian proses, setelah di proses di ceklist akan pindah ke bagian done. 
semua bagian bisa di edit maupun didelete Tasknya