<template>
  <div>
    <v-container v-for="(element, id) in fields" :key="id">
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title class="subtitle-1" style="white-space: normal;">{{
          element.title
        }}</v-toolbar-title>

        <v-spacer />
      </v-toolbar>
      <table v-if="element.textarea">
        <tbody>
          <span class="caption"> {{ element.label }}</span>
          <tr>
            <td>
              <v-textarea
                class="pt-2"
                rounded
                background-color="rgb(240,240,240)"
                prepend-inner-icon="mdi-pencil"
                solo
                rows="4"
                v-model="form[element.model]"
                :rules="rules[element.validator]"
                @change="updateData()"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table v-else>
        <tbody>
          <span class="caption"> {{ element.label }}</span>
          <tr>
            <td>
              <v-text-field
                class="pt-2"
                rounded
                filled
                prepend-inner-icon="mdi-pencil"
                v-model="form[element.model]"
                :rules="rules[element.validator]"
                @change="updateData()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: [value => !!value || "Pole wymagane"],
        people: [
          value => !!value || "Pole wymagane",
          value =>
            /^@[a-zA-Z]+\.[a-zA-Z]+$/i.test(value) ||
            "Błedny format, @imie.nazwisko"
        ]
      },
      form: {
        summary: "",
        description: "",
        custom_field_4: "",
        custom_field_5: "",
        custom_field_8: "",
        custom_field_10: "",
        custom_field_9: "",
        custom_field_11: ""
      },
      fields: [
        {
          title: "Nazwa projektu",
          model: "summary",
          validator: "required"
        },
        {
          title: "Tło projektu",
          model: "description",
          label:
            "Przykład: Muszę zamawiać elementy do nowego typoszeregu urządzeń o nazwie GOLD. W tej chwili szacuję na podstawie istniejących raportów. Raporty te nie są wystarczające gdyż nie uwzględniają różnych elementów nowego urządzenia. Ponadto chciałbym używać innych parametrów WE do mojego raportu. Zatem potrzebny jest nowy raport zapotrzebowania na elementy.",
          validator: "required"
        },
        {
          title: "Przełożony osoby odpowiedzialnej za projekt",
          model: "custom_field_4",
          label:
            " Przełożony to osoba, która zna i akceptuje zakres projektu. Podaj imię i nazwisko przełożonego w formacie: @imie.nazwisko",
          validator: "people"
        },
        {
          title: "Osoba odpowiedzialna za projekt",
          model: "custom_field_5",
          label:
            " Jest to osoba prowadząca projekt, akceptująca propozycje zmian, testująca i odbierająca rozwiązanie. Reprezentuje biznes oraz organizuje współpracę pomiędzy interesariuszami. Domyślnie: osoba zgłaszająca zadanie na Mantisie.",
          validator: "required"
        },
        {
          title: "Cel główny/produkty projektu",
          textarea: "true",
          model: "custom_field_8",
          label:
            "Przykład: Wykonanie nowego raportu zapotrzebowania do nowego typoszeregu urządzeń GOLD.",
          validator: "required"
        },
        {
          title: "Grupa docelowa",
          model: "custom_field_10",
          label: "Przykład: Kupiec strategiczny oraz jego zastępca.",
          validator: "required"
        },
        {
          title: "Cel biznesowy projektu",
          textarea: "true",
          model: "custom_field_9",
          label:
            "Przykład: Raport zapotrzebowania pozwoli na precyzyjne zamawianie. Szacowanie na podstawie aktualnych dostępnych narzędzi może spowodować pomyłkę, która będzie miała poważne skutki finansowe. Każda część do nowego typoszeregu  wykonana jest z drogiego materiału. Średnia cena nowego urządzenia to ok 2mln PLN. Każde takie urządzenie zawiera średnio 40 el. składowych w cenach od 5tys PLN do 800tys PLN. Zatem celem biznesowym jest 0% błędnych zamówień.",
          validator: "required"
        },
        {
          title: "Inne zaangażowane strony/ interesariusze",
          model: "custom_field_11",
          label:
            "Przykład: Księgowość, Kontroling, producent, obszary na które zmiana będzie miała wpływ",
          validator: "required"
        }
      ]
    };
  },
  methods: {
    updateData() {
      this.$store.commit("gardensForm/ADD", this.form);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
