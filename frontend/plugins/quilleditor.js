import { defineNuxtPlugin } from "#app";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineNuxtPlugin(nuxtApp => {
  QuillEditor.props.globalOptions.default = {
    modules: {
      toolbar: ''
    },
    theme: '',
    placeholder: 'Write something here...',
  };
  nuxtApp.vueApp.component('QuillEditor', QuillEditor);
})