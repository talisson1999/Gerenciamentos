
<template>
  <div class="dashboard-container">
    <h1>Bem-vindo, {{ user.name }}</h1>

    <button @click="logout">Sair</button>

    <!-- Cards de totais -->
    <div class="totals">
      <div class="total-card">
        <h3>Entradas R$</h3>
        <p>{{ totalIncomes | currency }}</p>
      </div>
      <div class="total-card">
        <h3>Saídas R$</h3>
        <p>{{ totalExpenses | currency }}</p>
      </div>
    </div>

    <!-- Tabela de movimentações financeiras -->
    <div class="movements">
      <h3>Movimentações Financeiras</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor R$</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movement, index) in movements" :key="index">
            <td>{{ movement.date }}</td>
            <td>{{ movement.description }}</td>
            <td :class="{ 'positive': movement.amount > 0, 'negative': movement.amount < 0 }">
              {{ movement.amount | currency }}
            </td>
            <td>{{ movement.type }}</td>
            <td>{{ movement.category }}</td>
            <td>
              <button @click="editMovement(index)">Editar</button>
              <button @click="deleteMovement(index)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Gerenciamento de Categorias -->
    <div class="categories">
  <h3>Categorias</h3>
  <div class="category-list">
    <ul>
      <li v-for="(category, index) in categories" :key="index">
        <span>{{ category }}</span>
        <button @click="deleteCategory(index)" class="delete-btn">Excluir</button>
      </li>
    </ul>
  </div>

  <div class="add-category">
    <input 
      type="text" 
      v-model="newCategory" 
      placeholder="Nova categoria" 
      @keyup.enter="addCategory" 
      class="category-input"
    />
    <button @click="addCategory" class="add-btn">Adicionar Categoria</button>
  </div>
</div>

    <!-- Botão para abrir o Popup -->
    <button class="add-btn" @click="openPopup">Adicionar Movimentação</button>

    <!-- Popup de adição/edição -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-container">
        <h3>{{ editing ? 'Editar Movimentação' : 'Adicionar Movimentação' }}</h3>
        <form @submit.prevent="saveMovement">
          <label for="date">Data:</label>
          <input type="date" v-model="newMovement.date" required />

          <label for="description">Descrição:</label>
          <input type="text" v-model="newMovement.description" required />

          <label for="amount">Valor R$:</label>
          <input type="number" v-model="newMovement.amount" required />

          <label for="type">Tipo:</label>
          <select v-model="newMovement.type" required>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>

          <label for="category">Categoria:</label>
          <select v-model="newMovement.category" required>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>

          <button type="submit">{{ editing ? 'Salvar Alterações' : 'Adicionar' }}</button>
        </form>
        <button class="close-popup" @click="closePopup">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      movements: [],
      categories: [],
      newCategory: '',
      newMovement: {
        date: '',
        description: '',
        amount: 0,
        type: 'Entrada',
        category: '',
      },
      totalIncomes: 0,
      totalExpenses: 0,
      editing: false,
      editingIndex: null,
      showPopup: false,
    };
  },
  created() {
    this.loadUserData();
    this.loadMovements();
    this.loadCategories();
  },
  methods: {
    logout() {
      console.log("Botão de sair clicado"); // Para verificar se o método está sendo chamado

      // Remove o token do localStorage
      localStorage.removeItem('token');

      // Redireciona para a página de login
      this.$router.push('/login').catch(err => console.warn(err));
    },
    loadUserData() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user.name = storedUser.name;
      }
    },
    loadMovements() {
      this.movements = JSON.parse(localStorage.getItem('movements')) || [];
      this.calculateTotals();
    },
    loadCategories() {
      this.categories = JSON.parse(localStorage.getItem('categories')) || [];
    },
    calculateTotals() {
      this.totalIncomes = this.movements.filter(m => m.type === 'Entrada').reduce((acc, curr) => acc + curr.amount, 0);
      this.totalExpenses = this.movements.filter(m => m.type === 'Saída').reduce((acc, curr) => acc + curr.amount, 0);
    },
    addCategory() {
      if (this.newCategory && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
        localStorage.setItem('categories', JSON.stringify(this.categories));
        this.newCategory = '';
      }
    },
    deleteCategory(index) {
      this.categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(this.categories));
    },
    saveMovement() {
      if (this.editing) {
        this.movements[this.editingIndex] = { ...this.newMovement };
      } else {
        this.movements.push({ ...this.newMovement, date: this.newMovement.date || new Date().toISOString().split('T')[0] });
      }
      localStorage.setItem('movements', JSON.stringify(this.movements));
      this.calculateTotals();
      this.resetForm();
      this.closePopup();
    },
    editMovement(index) {
      this.newMovement = { ...this.movements[index] };
      this.editing = true;
      this.editingIndex = index;
      this.openPopup();
    },
    deleteMovement(index) {
      this.movements.splice(index, 1);
      localStorage.setItem('movements', JSON.stringify(this.movements));
      this.calculateTotals();
    },
    resetForm() {
      this.newMovement = { date: '', description: '', amount: 0, type: 'Entrada', category: '' };
      this.editing = false;
      this.editingIndex = null;
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.resetForm();
    },
  },
  filters: {
    currency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },
};
</script>

