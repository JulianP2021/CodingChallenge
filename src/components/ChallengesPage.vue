<script setup lang="ts">
import { defineProps } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import challenges from "./challenges.json"
const router = useRouter();


interface Props {
    id: string;
    score: string;
}

const { id = "0", score = "0" } = defineProps<Props>();
const indexChallenge = parseInt(id) % challenges.length;

const challenge = challenges[indexChallenge];


const code = ref("return ");
const error = ref("");

const changeSolutionDisplay = ref("Show Solution");
const solution = ref("");

const timerValue = ref(challenge.timeToCode);
let interval: number | null = null;

onMounted(() => {
    console.log(timerValue.value);

    interval = window.setInterval(() => {
        if (timerValue.value > 0) {
            timerValue.value--;
        }
        if (timerValue.value === 0) {
            finished(parseInt(score));
        }
    }, 1000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

function onChangeSolutionDisplay() {
    if (changeSolutionDisplay.value == "Show Solution") {
        solution.value = challenge.solution;
        changeSolutionDisplay.value = "Hide Solution";
    } else {
        solution.value = "";
        changeSolutionDisplay.value = "Show Solution";
    }
}

function nextChallenge(new_score: number) {
    console.log("nextChallenge " + new_score);
    if (indexChallenge == challenges.length - 1) {
        router.push("/result/" + new_score)
        return;
    }
    router.push("/challenge/" + (parseInt(id) + 1) + "/" + new_score)
}

function finished(score: number) {
    clearInterval(interval);
    router.push("/result/" + score)
}

function stopTimer() {
    console.log("StopTimer");

    if (interval !== null) {
        let new_score: number = timerValue.value + parseInt(score);
        clearInterval(interval);
        interval = null;
        nextChallenge(new_score)
    }
}

function onSubmit() {
    for (let testCase of challenge.testCases) {
        let result;
        try {
            const funcCode = `(input) => { ${code.value} }`;
            const fn = eval(funcCode);

            // @ts-ignore
            result = fn(testCase.input);
        } catch (e) {
            result = e;
        }
        if (result != testCase.expected) {
            const possible_error = `Not what we expected: Expected ${testCase.expected} but got ${result} based on input ${testCase.input}`
            if (possible_error.length < 200) {
                error.value = possible_error;
            } else {
                error.value = "Error to long to print";
            }
            return;
        }
    }
    stopTimer();
}

</script>


<template>
    <div id="task" class="declaration-box">
        <div class="declaration">{{ challenge.declaration }}</div>
        <div class="type-interface">
            <pre>type of input = 
{{ challenge.type }}</pre>
        </div>
        <pre id="js-declaration">{{ challenge.functionHeader }}
        <input class="input-field inline-input" type="text" v-model="code"/>
}</pre>
        <button @click="onSubmit" style="margin-top: 12px;">Submit</button>

        <div v-if="!(error === '')" style="color: red; font-weight: bold; margin-top: 16px;">
            {{ error }}
        </div>
        <div id="timer" style="font-weight: bold; margin-top: 16px;">Time: {{ timerValue }} seconds</div>
    </div>
    <div v-if="!(solution === '')" class="solution" style="color: green; font-weight: bold; margin-top: 16px;">
        {{ solution }}
    </div>


    <button class="solution" @click="onChangeSolutionDisplay" style="margin-top: 16px;">
        {{ changeSolutionDisplay }}
    </button>
</template>

<style scoped>
.declaration-box {
    border: 1px solid #ccc;
    padding: 20px;
    width: 800px;
    margin: 40px auto;
    border-radius: 8px;
    background: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.declaration {
    font-weight: bold;
    margin-bottom: 12px;
}

.input-field {
    width: 750px;
    padding: 8px;
    font-size: 1em;
    border: 1px solid #bbb;
    border-radius: 4px;
    margin-left: 20px;
    margin-right: 10px;
}

pre#js-declaration {
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 1em;
    margin-bottom: 0;
}

.inline-input {
    display: inline-block;
    margin-right: 10px;
    height: 10px;
    margin-top: auto;
}

.type-interface {
    background: #938f8f;
    width: calc(2 * fit-content(100%));
}
</style>