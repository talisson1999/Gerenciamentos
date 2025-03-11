<template>
  <div class="register-container">
    <form @submit.prevent="register">
      <div class="form-header">
        <h1>Cadastrar-se</h1>
        <p class="subheading">Crie sua conta para começar a usar o app</p>
      </div>

      <div>
        <label for="name">Nome:</label>
        <input type="text" v-model="name" required placeholder="Digite seu nome" />
        <span v-if="nameError" class="error-message">{{ nameError }}</span>
      </div>
      
      <div>
        <label for="email">E-mail:</label>
        <input type="email" v-model="email" required placeholder="Digite seu e-mail" />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      
      <div>
        <label for="password">Senha:</label>
        <input type="password" v-model="password" required placeholder="Digite sua senha" />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>
      
      <div>
        <label for="password_confirmation">Confirmar Senha:</label>
        <input type="password" v-model="password_confirmation" required placeholder="Confirme sua senha" />
        <span v-if="passwordConfirmationError" class="error-message">{{ passwordConfirmationError }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmationError: '',
      isSubmitting: false,
    };
  },
  methods: {
    validateForm() {
      this.nameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.passwordConfirmationError = '';

      let isValid = true;

      if (!this.name) {
        this.nameError = 'Por favor, insira seu nome.';
        isValid = false;
      }

      if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = 'Por favor, insira um e-mail válido.';
        isValid = false;
      }

      if (!this.password) {
        this.passwordError = 'Por favor, insira sua senha.';
        isValid = false;
      }

      if (this.password !== this.password_confirmation) {
        this.passwordConfirmationError = 'As senhas não coincidem.';
        isValid = false;
      }

      return isValid;
    },
    register() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      localStorage.setItem('user', JSON.stringify(user));

      alert('Cadastro bem-sucedido!');
      this.$router.push('/login');
    },
  },
};
</script>

