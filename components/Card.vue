<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
                <!-- Policy Details -->
            <div class="block card">
              <div class="card-header">
                <h4 class="card-header-title is-4">Policy Details</h4>
                <span class="card-header-icon">
                  <b-icon icon="note-text-outline"></b-icon>
                </span>
              </div>
            </div>
          <FormulateForm>
            <div class="columns">
                <div class="column is-one-third">
                  Name
                    <b-input type="text" name="name" placeholder="John Phiri"/>
                </div>

                <div class="column is-one-third">
                  Currency
                    <b-input type="number" name="currency" placeholder="ZMW"/>
                    
                </div>
                 <div class="column is-one-third">
                  No. of Quarters
                   <b-input type="number" name="NumOfQuarters" id="NOQ" placeholder="1"/>
                </div>
            </div>

            <div class="columns">

                <div class="column is-one-third">
                  Start Date
                   <b-input type="date" name="startDate" id="date" placeholder="dd/mm/yyyy"/>
                </div>

                
                 <div class="column is-one-third">
                  End Date
                   <b-input type="date" name="endDate" id="date" placeholder="dd/mm/yyyy"/>
                </div>
            </div>

          </FormulateForm>

          
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
