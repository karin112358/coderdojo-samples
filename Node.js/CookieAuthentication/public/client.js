function login() {
    var data = {
        username: $('#username').val(),
        password: $('#password').val()
    };

    $.post({
        url: '/login',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            location.href = '/admin/admin.html';
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function adminPageLoaded() {
    $.get('/admin/color',
        null,
        function (data) {
            if (data.color) {
                $('#colorPicker').val(data.color);
            } else {
                $('#color').text('No color selected');
            }
        });
}

function changeColor() {
    var colorData = { color: $('#colorPicker').val() };
    $.post({
        url: '/admin/color',
        data: JSON.stringify(colorData),
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            $('#color').text(colorData.color);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

