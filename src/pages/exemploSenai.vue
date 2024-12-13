<template>
  <div class="q-pa-md">
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
        icon="add"
        direction="up"
        color="primary"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action
          @click="openDialog"
          color="primary"
          icon="person_add"
          :disable="draggingFab"
        />
        <q-fab-action
          @click="onClick"
          color="primary"
          icon="palette"
          :disable="draggingFab"
        />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="colorPickerOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Selecione a cor do cabeçalho</div>
        </q-card-section>
        <q-card-section>
          <q-color v-model="headerColor" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn
            flat
            label="Aplicar"
            color="positive"
            @click="applyColor"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- modal -->
    <q-dialog v-model="dialogOpen">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nova Pessoa</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="newItem.nomeCompleto" label="Nome Completo" />
          <q-input
            v-model="newItem.dataNascimento"
            label="Data de Nascimento"
            mask="##/##/####"
          />
          <q-input v-model="newItem.cpf" label="CPF" mask="###.###.###-##" />
          <q-input v-model="newItem.email" label="Email" type="email" />
          <q-input
            v-model="newItem.telefone"
            label="Telefone"
            mask="(##) #####-####"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn
            flat
            label="Adicionar"
            color="positive"
            @click="addItem"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="[
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Por Célula', value: 'cell' },
        { label: 'Nenhum', value: 'none' },
      ]"
    />

    <q-table
      :rows="tableRows"
      :columns="columns"
      :separator="separator"
      title="Cadastro de Pessoas"
      :rows-per-page-options="[]"
      row-key="name"
      :table-header-style="`background-color: ${headerColor}`"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nomeCompleto" :props="props">
            {{ props.row.nomeCompleto }}
            <q-popup-edit
              v-model="props.row.nomeCompleto"
              buttons
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="dataNascimento" :props="props">
            {{ props.row.dataNascimento }}
            <q-popup-edit
              v-model="props.row.dataNascimento"
              buttons
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                mask="##/##/####"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="cpf" :props="props">
            {{ props.row.cpf }}
            <q-popup-edit v-model="props.row.cpf" buttons v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                mask="###.###.###-##"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" buttons v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                type="email"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="telefone" :props="props">
            {{ props.row.telefone }}
            <q-popup-edit v-model="props.row.telefone" buttons v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                mask="(##) #####-####"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td auto-width>
            <q-btn
              flat
              round
              dense
              color="negative"
              icon="delete"
              @click="deleteRow(props.row)"
            >
              <q-tooltip>Excluir pessoa</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

const columns = [
  {
    name: "nomeCompleto",
    align: "left",
    label: "Nome Completo",
    field: "nomeCompleto",
    align: "center",
  },
  {
    name: "dataNascimento",
    align: "center",
    label: "Data de Nascimento",
    field: "dataNascimento",
  },
  { name: "cpf", label: "CPF", field: "cpf", align: "center" },
  { name: "email", label: "Email", field: "email", align: "center" },
  { name: "telefone", label: "Telefone", field: "telefone", align: "center" },
  { name: "actions", label: "Ações", field: "actions", align: "center" },
];

const initialRows = [
  {
    nomeCompleto: "João da Silva",
    dataNascimento: "01/01/1990",
    cpf: "123.456.789-00",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
  },
  {
    nomeCompleto: "Maria Santos Oliveira",
    dataNascimento: "15/03/1985",
    cpf: "987.654.321-00",
    email: "maria.santos@email.com",
    telefone: "(21) 97654-3210",
  },
  {
    nomeCompleto: "Pedro Henrique Costa",
    dataNascimento: "22/07/1993",
    cpf: "456.789.123-00",
    email: "pedro.costa@email.com",
    telefone: "(31) 96543-2109",
  },
  {
    nomeCompleto: "Ana Carolina Ferreira",
    dataNascimento: "30/11/1988",
    cpf: "789.123.456-00",
    email: "ana.ferreira@email.com",
    telefone: "(41) 95432-1098",
  },
  {
    nomeCompleto: "Lucas Mendes Souza",
    dataNascimento: "05/09/1995",
    cpf: "321.654.987-00",
    email: "lucas.mendes@email.com",
    telefone: "(51) 94321-0987",
  },
  {
    nomeCompleto: "Juliana Alves Lima",
    dataNascimento: "18/04/1992",
    cpf: "654.987.321-00",
    email: "juliana.alves@email.com",
    telefone: "(61) 93210-9876",
  },
  {
    nomeCompleto: "Rafael Rodrigues Santos",
    dataNascimento: "25/08/1987",
    cpf: "147.258.369-00",
    email: "rafael.santos@email.com",
    telefone: "(71) 92109-8765",
  },
  {
    nomeCompleto: "Fernanda Silva Costa",
    dataNascimento: "12/06/1991",
    cpf: "258.369.147-00",
    email: "fernanda.costa@email.com",
    telefone: "(81) 91098-7654",
  },
  {
    nomeCompleto: "Gabriel Oliveira Lima",
    dataNascimento: "03/12/1994",
    cpf: "369.147.258-00",
    email: "gabriel.lima@email.com",
    telefone: "(91) 90987-6543",
  },
  {
    nomeCompleto: "Beatriz Santos Pereira",
    dataNascimento: "28/02/1989",
    cpf: "741.852.963-00",
    email: "beatriz.pereira@email.com",
    telefone: "(12) 98876-5432",
  },
  {
    nomeCompleto: "Thiago Ferreira Costa",
    dataNascimento: "09/10/1993",
    cpf: "852.963.741-00",
    email: "thiago.costa@email.com",
    telefone: "(13) 97765-4321",
  },
  {
    nomeCompleto: "Carolina Lima Souza",
    dataNascimento: "14/07/1986",
    cpf: "963.741.852-00",
    email: "carolina.souza@email.com",
    telefone: "(14) 96654-3210",
  },
  {
    nomeCompleto: "Marcelo Alves Santos",
    dataNascimento: "21/05/1990",
    cpf: "159.357.456-00",
    email: "marcelo.santos@email.com",
    telefone: "(15) 95543-2109",
  },
  {
    nomeCompleto: "Isabela Costa Silva",
    dataNascimento: "07/01/1996",
    cpf: "357.159.456-00",
    email: "isabela.silva@email.com",
    telefone: "(16) 94432-1098",
  },
  {
    nomeCompleto: "Ricardo Oliveira Mendes",
    dataNascimento: "16/08/1988",
    cpf: "456.159.357-00",
    email: "ricardo.mendes@email.com",
    telefone: "(17) 93321-0987",
  },
];

export default {
  setup() {
    const fabPos = ref([18, 18]);
    const draggingFab = ref(false);

    const tableRows = ref([...initialRows]);
    const dialogOpen = ref(false);
    const newItem = reactive({
      nomeCompleto: "",
      dataNascimento: "",
      cpf: "",
      email: "",
      telefone: "",
    });

    const openDialog = () => {
      dialogOpen.value = true;
    };

    const addItem = () => {
      const novaPessoa = {
        nomeCompleto: newItem.nomeCompleto,
        dataNascimento: newItem.dataNascimento,
        cpf: newItem.cpf,
        email: newItem.email,
        telefone: newItem.telefone,
      };
      tableRows.value.unshift(novaPessoa);
    };

    const deleteRow = (row) => {
      const index = tableRows.value.indexOf(row);
      if (index !== -1) {
        tableRows.value.splice(index, 1);
      }
    };

    const separator = ref("none");

    const colorPickerOpen = ref(false);
    const headerColor = ref("#1976D2"); // cor padrão do Quasar primary

    const onClick = () => {
      colorPickerOpen.value = true;
    };

    const applyColor = () => {
      // O color picker já atualiza automaticamente o headerColor
      colorPickerOpen.value = false;
    };

    return {
      tableRows,
      columns,
      dialogOpen,
      newItem,
      openDialog,
      addItem,
      deleteRow,

      fabPos,
      draggingFab,

      moveFab(ev) {
        draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

        fabPos.value = [
          fabPos.value[0] - ev.delta.x,
          fabPos.value[1] - ev.delta.y,
        ];
      },
      separator,
      colorPickerOpen,
      headerColor,
      onClick,
      applyColor,
    };
  },
};
</script>

<style>
.q-table th {
  color: white !important;
  transition: background-color 0.3s ease;
}
</style>
