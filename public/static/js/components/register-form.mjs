import { html, Hooks } from '../preact/preact.mjs';
import { Form } from './form.mjs';
import { EMAIL_INPUT_STYLE } from '../utils/style.mjs';
import { useApi } from '../api/api.mjs';
import { MD5 } from '../utils/auth/MD5.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { RouteLogin } from '../routes.mjs';

const getValueFromEvent = ({ currentTarget: { value } }) => value;

export const RegisterForm = ({ inviteId }) => {
  const { register } = useApi();
  const ifMounted = useIfMounted();
  const { push } = useRouteData();
  const [isRegistering, setIsRegistering] = Hooks.useState(false);
  const [userName, setUserName] = Hooks.useState('');
  const [email, setEmail] = Hooks.useState('');
  const [password, setPassword] = Hooks.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = Hooks.useState('');

  const handleUserNameChange = Hooks.useCallback((evt) => {
    setUserName(getValueFromEvent(evt));
  }, []);
  const handleEmailChange = Hooks.useCallback((evt) => {
    setEmail(getValueFromEvent(evt));
  }, []);
  const handlePasswordChange = Hooks.useCallback((evt) => {
    setPassword(getValueFromEvent(evt));
  }, []);
  const handlePasswordConfirmationChange = Hooks.useCallback((evt) => {
    setPasswordConfirmation(getValueFromEvent(evt));
  }, []);

  const handleSubmit = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      if (password !== passwordConfirmation) {
        return alert('Пароли не совпадают');
      }

      if (password.length < 8) {
        return alert('Слишком короткий пароль');
      }

      const emailActual = email.trim().toLocaleLowerCase();
      const passwordHash = MD5(password);

      setIsRegistering(true);
      register(inviteId, userName, emailActual, passwordHash)
        .then(
          ifMounted(() => {
            setIsRegistering(false);
            push(RouteLogin.link());
            alert('Пользователь успешно зарегистрирован');
          })
        )
        .catch(
          ifMounted(() => {
            setIsRegistering(false);
            alert('При регистрации произошла ошибка, попробуйте позднее');
          })
        );
    },
    [
      push,
      inviteId,
      register,
      userName,
      email,
      password,
      passwordConfirmation,
      ifMounted,
    ]
  );

  return html`
    <${Form} busy=${isRegistering} onSubmit=${handleSubmit}>
      <h1>Регистрация</h1>
      <div className="form-group">
        <label for="username-input">
          Имя пользователя
        </label>
        <input
          required
          autocomplete="username"
          className="form-control"
          id="username-input"
          value=${userName}
          onInput=${handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <label for="email-input">
          Ваш Email
        </label>
        <input
          required
          style=${EMAIL_INPUT_STYLE}
          type="email"
          autocomplete="email"
          className="form-control"
          id="email-input"
          value=${email}
          onInput=${handleEmailChange}
        />
      </div>
      <div className="form-group">
        <label for="password-input">
          Пароль
        </label>
        <input
          required
          type="password"
          autocomplete="password"
          className="form-control"
          id="password-input"
          value=${password}
          onInput=${handlePasswordChange}
        />
      </div>
      <div className="form-group">
        <label for="password-cofirmation-input">
          Подтверждение пароля
        </label>
        <input
          required
          type="password"
          autocomplete="password"
          className="form-control"
          id="password-input"
          value=${passwordConfirmation}
          onInput=${handlePasswordConfirmationChange}
        />
      </div>
      <button type="submit" className="btn btn-primary float-right">
        Зарегистрироваться
      </button>
    </${Form}>
  `;
};
