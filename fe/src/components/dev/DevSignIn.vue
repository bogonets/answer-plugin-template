<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field
            type="text"
            ref="originField"
            label="API Origin"
            :rules="[requiredField]"
            :value="origin"
            @input="onInputOrigin"
          ></v-text-field>
          <v-text-field
            autofocus
            type="text"
            ref="usernameField"
            label="API Origin"
            :rules="[requiredField]"
            :value="username"
            @input="onInputUsername"
          ></v-text-field>
          <v-text-field
            type="password"
            autocomplete="off"
            ref="passwordField"
            label="Password"
            :rules="[requiredField]"
            :value="password"
            @input="onInputPassword"
          ></v-text-field>
        </v-form>

        <div v-if="signed">
          <v-select return-object v-model="project" :items="projects" label="Projects">
            <template v-slot:item="{item}">
              {{ item.name }}
              <v-chip class="ml-2" x-small outlined color="primary">
                <v-icon left>mdi-identifier</v-icon>
                {{ `${item.group_slug}/${item.project_slug}` }}
              </v-chip>
            </template>

            <template v-slot:selection="{item}">
              {{ item.name }}
              <v-chip class="ml-2" x-small outlined color="primary">
                <v-icon left>mdi-identifier</v-icon>
                {{ `${item.group_slug}/${item.project_slug}` }}
              </v-chip>
            </template>
          </v-select>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="errorMessage">
      <span>{{ errorMessage }}</span>
    </v-row>
    <v-row v-else-if="signed">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="clickSubmit">Submit</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Emit, Ref} from 'vue-property-decorator';
import type {ReccCwcClientInit} from '@recc/api/dist/reccCwcClient';
import {VTextField} from 'vuetify/es5/components';
import ReccApi from '@recc/api';
import {ProjectA} from '@recc/api/dist/packet/project';

@Component
export default class DevSignIn extends Vue {
  @Ref('originField')
  readonly originField!: VTextField;

  @Ref('usernameField')
  readonly usernameField!: VTextField;

  @Ref('passwordField')
  readonly passwordField!: VTextField;

  loading = false;
  signed = false;
  errorMessage = '';
  projects = [] as Array<ProjectA>;
  project?: ProjectA;

  origin!: string;
  username!: string;
  password!: string;
  dark!: number;
  lang!: string;
  timezone!: string;

  created() {
    const params = this.$sessionStore.devSignin as ReccCwcClientInit;
    this.origin = params.origin;
    this.username = params.username;
    this.password = params.password;
    this.dark = params.dark;
    this.lang = params.lang;
    this.timezone = params.timezone;
  }

  mounted() {
    this.signin();
  }

  requiredField(value): boolean | string {
    return !!value || 'Required field';
  }

  validateForms(): boolean {
    const fields = [this.originField, this.usernameField, this.passwordField];
    let result = true;
    for (const key in fields) {
      const field = fields[key];
      if (!field) {
        continue;
      }

      const validate = field['validate'];
      if (validate === undefined) {
        continue;
      }

      // You need to repeat the validation function for every field.
      if (!validate(true)) {
        result = false;
      }
    }
    return result;
  }

  async requestSignin() {
    try {
      const api = new ReccApi({origin: this.origin});
      const signin = await api.postSignin(this.username, this.password);
      this.dark = signin.user.dark;
      this.lang = signin.user.lang;
      this.timezone = signin.user.timezone;

      this.projects = await api.getMainProjects();
      this.project = this.projects[0];

      this.errorMessage = '';
      this.signed = true;
    } catch (e) {
      this.errorMessage = `${e}`;
      this.signed = false;
    } finally {
      this.loading = false;
    }
  }

  signin() {
    if (!this.validateForms()) {
      return;
    }

    this.loading = true;
    this.signed = false;
    (async () => {
      await this.requestSignin();
    })();
  }

  onInputOrigin(value: string) {
    this.origin = value;
    this.signin();
  }

  onInputUsername(value: string) {
    this.username = value;
    this.signin();
  }

  onInputPassword(value: string) {
    this.password = value;
    this.signin();
  }

  @Emit('click:submit')
  clickSubmit() {
    const result = {
      origin: this.origin,
      username: this.username,
      password: this.password,
      dark: this.dark,
      lang: this.lang,
      timezone: this.timezone,
      group: this.project?.group_slug ?? '',
      project: this.project?.project_slug ?? '',
    } as ReccCwcClientInit;
    this.$sessionStore.devSignin = result;
    return result;
  }
}
</script>
