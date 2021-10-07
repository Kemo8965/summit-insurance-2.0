<template>
  <div>
      <!-- Policy Details -->
    <div class="block card">
      <div class="card-header">
        <h4 class="card-header-title is-4">Policy Details</h4>
        <span class="card-header-icon">
          <b-icon icon="note-text-outline"></b-icon>
        </span>
      </div>
    </div>
<FormulateForm
    class="login-form block card"
    v-model="formValues"
  >
    <h2 class="form-title">Register</h2>
    <p>
      You can place any elements you want inside a form. The inputs themselves
      can even be deeply nested.
    </p>
    <FormulateInput
      name="name"
      type="text"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      name="email"
      type="email"
      label="Email address"
      placeholder="Email address"
      validation="required|email"
    />
    <div class="double-wide">
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        validation="required"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label="Confirm your password"
        placeholder="Confirm password"
        validation="required|confirm"
        validation-name="Confirmation"
      />
    </div>
    <FormulateInput
      type="submit"
      label="Register"
    />
    <pre
      class="code"
      v-text="formValues"
    />
  </FormulateForm>


  </div>
</template>

<script>
export default {

}
</script>

<style>
.columns{
    color: black;
    border-radius: 10px;
    font-size: 1rem;
    width: 50px;
}

.card{
  padding: 15px;
}
</style>