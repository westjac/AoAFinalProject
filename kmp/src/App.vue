<template>
  <div>
    <img alt="Reddit logo" style="height: 225px" src="./assets/logo.png" />
    <h1>KMP Reddit Scraper</h1>
    <p>Ryan Driscoll & Jacob B. West - CSC 461</p>
    <div>
      <label for="symbol">Enter Pattern to Search For </label>
      <input
        v-model="message"
        type="text"
        id="symbol"
        placeholder="pattern..."
      />
      <button @click="RunKMP">Get Count!</button>
    </div>
    <span>Number of Matches: {{ wordCount }}</span>
    <div id="runTime">
      <ScatterChart :chartData="testData" />
    </div>
  </div>
</template>

<script>
import { GetRedditPosts } from "../scripts/app.js";
import { ScatterChart } from "vue-chart-3";
import { TestRunTime } from "../scripts/RunTimeTest.js";

export default {
  name: "App",
  components: { ScatterChart },
  setup() {
    const runTimeData = TestRunTime();
    const testData = {
      datasets: [
        {
          label: "Test Point",
          data: runTimeData,
          backgroundColor: ["#ff4300"],
        },
      ],
      options: {
        scales: {
          yAxis: [
            {
              scaleLabel: {
                display: true,
                labelString: "Your Title",
              },
            },
          ],
        },
      },
    };

    return { testData };
  },
  methods: {
    async RunKMP() {
      this.wordCount = await GetRedditPosts(this.message);
    },
    TestRunTime() {},
  },
  data() {
    return {
      message: "",
      wordCount: 0,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#runTime {
  margin: 1em;
}
</style>
