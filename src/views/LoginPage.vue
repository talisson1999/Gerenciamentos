<template>
  <div>
    <div class="login-container">
      <form @submit.prevent="login">
        <div class="form-header">
          <h1>Bem-vindo de volta!</h1>
          <p class="subheading">Entre na sua conta para continuar</p>
        </div>
        <div>
          <label for="email">E-mail:</label>
          <input type="email" v-model="email" required />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>
        <div>
          <label for="password">Senha:</label>
          <input type="password" v-model="password" required />
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>
        <button type="submit" :disabled="isSubmitting">Entrar</button>

        <p class="register-link">
          Não tem uma conta? <router-link to="/register">Cadastre-se</router-link>
        </p>
      </form>
    </div>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isSubmitting: false,
    };
  },
  methods: {
    validateForm() {
      this.emailError = '';
      this.passwordError = '';

      if (!this.email) {
        this.emailError = 'Por favor, insira seu e-mail.';
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Por favor, insira um e-mail válido.';
      }

      if (!this.password) {
        this.passwordError = 'Por favor, insira sua senha.';
      }

      return !this.emailError && !this.passwordError;
    },
    login() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === this.email && storedUser.password === this.password) {
        localStorage.setItem('token', 'fake-token'); 
        alert('Login bem-sucedido!');
        this.$router.push('/dashboard');
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }

      this.isSubmitting = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Container de login */
.login-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 2em;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.login-container:hover {
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho do formulário */
.form-header {
  text-align: center;
  margin-bottom: 1.5em;
}

h1 {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.subheading {
  font-size: 1rem;
  color: #666;
  font-weight: 400;
}

/* Formulário */
form {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
}

/* Estilo dos labels */
label {
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.4em;
}

/* Estilo dos inputs */
input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #4caf50;
  background-color: #fff;
  outline: none;
}

input::placeholder {
  color: #888;
}

/* Botão de envio */
button {
  padding: 12px;
  font-size: 1.1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button:active {
  transform: scale(1);
}

/* Mensagens de erro */
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5em;
}

/* Link para cadastro */
.register-link {
  text-align: center;
  margin-top: 1em;
  font-size: 0.9rem;
}

.register-link a {
  color: #4caf50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Media Queries */
@media (max-width: 768px) {
  .login-container {
    max-width: 80%;
    padding: 1.8em;
  }

  button {
    font-size: 1rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .login-container {
    max-width: 95%;
    padding: 1.5em;
  }

  input, button {
    font-size: 0.9rem;
    padding: 10px;
  }
}
</style>
