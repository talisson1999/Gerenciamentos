<template>
    <div>
      <h1>Editar Movimentação</h1>
      <form @submit.prevent="editarMovimentacao">
        <div>
          <label for="descricao">Descrição:</label>
          <input type="text" v-model="descricao" required />
        </div>
        <div>
          <label for="valor">Valor:</label>
          <input type="number" v-model="valor" required />
        </div>
        <div>
          <label for="data">Data:</label>
          <input type="date" v-model="data" required />
        </div>
        <div>
          <label for="tipo">Tipo:</label>
          <select v-model="tipo">
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        descricao: "",
        valor: "",
        data: "",
        tipo: "receita",
        index: null,
      };
    },
    created() {
      // Obter o índice da movimentação e carregar seus dados
      this.index = this.$route.params.index;
      const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
      const movimentacao = movimentacoes[this.index];
      
      if (movimentacao) {
        this.descricao = movimentacao.descricao;
        this.valor = movimentacao.valor;
        this.data = movimentacao.data;
        this.tipo = movimentacao.tipo;
      }
    },
    methods: {
      editarMovimentacao() {
        const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
        const movimentacaoAtualizada = {
          id: Date.now(), // Gerar um novo ID ou manter o antigo
          descricao: this.descricao,
          valor: parseFloat(this.valor),
          data: this.data,
          tipo: this.tipo,
        };
        
        // Atualizar a movimentação
        movimentacoes[this.index] = movimentacaoAtualizada;
        localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
  
        // Redirecionar para a página de movimentações
        this.$router.push("/movimentacoes");
      },
    },
  };
  </script>
  