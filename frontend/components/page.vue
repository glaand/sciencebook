<template>
    <div class="h-3/4">
        <h1 class="mb-4">
            <div class="flex">
                <div class="w-8/12 join">
                    <input type="text" class="input input-xs input-bordered w-full max-w-xs join-item" v-model="currentPage.title" @input="onAutoSave" />
                    <button class="btn btn-outline btn-xs join-item text-base-content" @click="() => savePage()">
                        <Icon name="material-symbols:save"/>Save Page
                    </button>
                    <span v-if="isSaving" class="animate-pulse ml-4">Saving...</span>
                </div>
                <div class="w-4/12 flex justify-end">
                    <button class="btn btn-error btn-xs" @click="() => deletePage()">
                        <Icon name="mdi:bin"/>Delete Page
                    </button>
                </div>
            </div>
            <div class="flex">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Auto save?</span> 
                        <input type="checkbox" checked="checked" class="checkbox bg-base ml-3" v-model="autosave"/>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Speech to text? (Experimental)</span> 
                        <input type="checkbox" checked="checked" class="checkbox bg-base ml-3" v-model="speechToText"/>
                        <AVMedia class="ml-3" v-if="stream" :media="stream" type="wform" :canv-height="20" line-color="#3b82f6"></AVMedia>
                    </label>
                </div>
            </div>
        </h1>
        <quill-editor ref="quill" theme="" :content="currentPage.content" v-model:content="currentPage.content" contentType="html" @textChange="onAutoSave"></quill-editor>
    </div>
</template>

<script setup lang="ts">
import useToast from '~/composables/toast';
import { AVMedia } from 'vue-audio-visual';

const { show } = useToast();
const pageStore = usePageStore();
const { currentPage } = storeToRefs(pageStore);
const quill = ref(null);
const isSaving = ref(false);
const autosave = ref(true);
const speechToText = ref(false);

const savePage = async () => {
    isSaving.value = true;
    await pageStore.updatePage();
    isSaving.value = false;

};

const deletePage = async () => {
    if (confirm('Are you sure you want to delete this page?')) {
        await pageStore.deletePage(currentPage.value);
        show('Page deleted', 'success');
    }
};

const onAutoSave = () => {
    if (autosave.value) {
        // Debounce the save function
        clearTimeout(window['autoSaveTimeout']);
        window['autoSaveTimeout'] = setTimeout(() => {
            savePage();
        }, 300);
    }
};

watch(currentPage, (newPage, oldPage) => {
    if (newPage.content !== oldPage.content) {
        quill.value.setContents(newPage.content || '');
    }
});

import OpenAI from "openai";

const config = useRuntimeConfig()
const openai = new OpenAI({
    apiKey: config.public.openApiKey,
    dangerouslyAllowBrowser: true
});

const stream = ref(null);
const recorder = ref(null);
const interval = ref(null);
const audioChunks = ref([]);

async function startRecording() {
    try {
        console.log('Starting recording...');
        stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder.value = new MediaRecorder(stream.value, { mimeType: 'audio/webm' });

        recorder.value.ondataavailable = e => {
            audioChunks.value.push(e.data);
        };

        recorder.value.start(2000); // Start recording

        // Set a timeout to stop recording after 5 seconds
        setTimeout(() => {
            console.log('Stopping recording...');
            if (recorder.value.state !== 'inactive') {
                recorder.value.stop();
                processAudioChunks();
            }
        }, 5000);
    } catch (error) {
        console.error('Error starting recording:', error);
    }
}

async function processAudioChunks() {
    try {
        if (audioChunks.value.length > 0) {
            console.log('Sending accumulated audio chunks to OpenAI:', audioChunks.value);
            await sendAudioToOpenAI(audioChunks.value); // Send accumulated audio chunks to OpenAI for transcription
            audioChunks.value = []; // Clear the accumulated chunks
        }
    } catch (error) {
        console.error('Error processing audio chunks:', error);
    }
}

async function sendAudioToOpenAI(chunks) {
    // Combine all chunks into a single buffer
    const buffer = new Blob(chunks, { type: 'audio/webm' });

    // Send audio to OpenAI for transcription
    const transcription = await openai.audio.transcriptions.create({
        file: await OpenAI.toFile(buffer, 'audio.webm', {
            contentType: 'audio/webm'
        }),
        model: "whisper-1",
    });

    const newContent = quill.value.getContents() + `<p>${transcription.text}</p>`
    quill.value.pasteHTML(newContent);
}

watch(() => speechToText.value, async (newVal) => {
    if (newVal) {
        // Start recording periodically
        interval.value = setInterval(startRecording, 6000); // Every 6 seconds
        startRecording(); // Start recording immediately
    } else {
        console.log('Stopping recording...');
        recorder.value.stop();
        stream.value = null;
        recorder.value = null;
        clearInterval(interval.value);
    }
});

</script>
