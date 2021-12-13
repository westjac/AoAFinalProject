<template>
  <div class="page">
    <img alt="Reddit logo" style="height: 225px" src="./assets/logo.png" />
    <h1>KMP Reddit Scraper</h1>
    <p>Ryan Driscoll & Jacob B. West - CSC 461</p>
    <p></p>
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
    <span class="result">Number of Matches on r/WallStreetBets: {{ wordCount }}</span>
    <br/>
    <div id="runTime">
      <h2>Random Data KMP Runtime Test</h2>
      <p>The data below comes from randomly generated string with a random pattern inserted that it is looking for. To download the data for a run, use the download button below the chart.</p>
      <ScatterChart :chartData="testData" />
      <button @click="DowloadCSV(encodedUri)">Download Chart Data</button>
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
    let [runTimeData, encodedUri] = TestRunTime();

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
          y: [
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

    return { testData, encodedUri };
  },
  methods: {
    async RunKMP() {
      this.wordCount = await GetRedditPosts(this.message);
    },
    TestRunTime() {},
    DowloadCSV(uri) {
      window.location.assign(uri)
    }
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

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.result {
  font-size: 1.5rem;
  padding: 1em;
}

#runTime {
  margin: 1em;
  width: 60%;
}
</style>
