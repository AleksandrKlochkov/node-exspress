const keys = require('../keys')


module.exports = function(email, token) {
    return {
            to: email,
            from: keys.EMAIL_FROM,
            subject: 'Восстановление доступа',
            html: `
                <h1>Вы забыли пароль?</h1>
                <p>Если нет, то проигнорируйте данное письмо</p>
                <p>Иначе переходите по ссылке для востановления пароля ниже</p>
                <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстаноить доступ</a></p>
                <hr />
                <a href="${keys.BASE_URL}">Магазин курсов</a>
            `
    }
}

