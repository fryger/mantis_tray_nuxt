export const state = () => ({
    form: {
        summary: "",
        description: "",
        custom_field_4: "",
        custom_field_5: "",
        custom_field_8: "",
        custom_field_10: "",
        custom_field_9: "",
        custom_field_11: ""
}
  })
  
  export const mutations = {
    ADD(state, payload) {
      state.form.summary = payload.summary,
      state.form.description = payload.description
      state.form.custom_field_4 = payload.custom_field_4
      state.form.custom_field_5 = payload.custom_field_5
      state.form.custom_field_8 = payload.custom_field_8
      state.form.custom_field_10 = payload.custom_field_10
      state.form.custom_field_9 = payload.custom_field_9
      state.form.custom_field_11 = payload.custom_field_11
    }
}

