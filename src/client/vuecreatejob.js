// loads Jobs

const server = 'https://masteringjs-job-board.azurewebsites.net';

Vue.createApp({
  data: () => ({
    company: '',
    logo: null,
    title: '',
    location: 'Anywhere',
    sticky: false,
    description: null,
    url: null,
    instructions: null,
    email: null,
    feedback: null,
    invoiceAddress: null,
    invoiceNotes: null,
    tags: [],
    tool: null,
  }),
  methods: {
    async postJob() {
      const formData = new FormData();
      formData.append('logo', this.logo);
      const headers = {'Content-Type': 'multipart/form-data'};
      await axios.post(server + '/api/createjob', {
        company: this.company,
        title: this.title,
        location: this.location,
        email: this.email,
        tags: this.tags,
        sticky: this.sticky,
        description: this.description,
        url: this.url,
        instructions: this.instructions,
        feedback: this.feedback,
        invoiceAddress: this.invoiceAddress,
        invoiceNotes: this.invoiceNotes,
        logo: formData
      }, {headers});
      console.log('Done');
    },
    addTool() {
      this.tags.push(this.tool);
      this.tool = null;
    },
    removeTool() {
      this.tags.pop();
    },
    assignImage() {
      this.logo = this.$refs.file.files[0];
    }
  },
  template: `
    <div>
      <h1>Hire JavaScript Developers</h1>
      <form action="" @submit.prevent="postJob()">
        <div>
          <label>Company Name</label>
          <input type="text" v-model="company" />
        </div>
        <div>
          <label>Position</label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label>Location</label>
          <input type="text" v-model="location" />
        </div>
        <div>
          <label>Sticky?</label>
          <input type="checkbox" v-model="sticky" />
        </div>
        <div>
          <div><label>Description</label></div>
          <textarea v-model="description">Enter Text Here</textarea>
        </div>
          <form action="" @submit.prevent="addTool()">
            <div v-for="tag in tags" :key="tag">{{tag}}</div>
              <label>Add Framework</label>
              <input type = "text" v-model="tool"/>
              <div>
              <button type = "submit">Submit</button>
              <button @click="removeTool()">Remove most recent entry</button>
              </div>
          </form>
        <div>
          <div><label>Company Image</label></div>
          <input type="file" @change="assignImage" ref = "file"/>
        </div>
        <div>
          <label>Apply URL</label>
          <input type="url" v-model="url"/>
        </div>
        <div>
          <div><label>How To Apply</label></div>
          <textarea v-model="instructions">To Apply</textarea>
        </div>
        <div>
          <label>Company Email</label>
          <input type="email" v-model="email"/>
        </div>
        <div>
          <div><label>Feedback</label></div>
          <textarea v-model="feedback">Type here</textarea>
        </div>
        <div>
          <label>Invoice Address</label>
          <input type="text" v-model="invoiceAddress" />
        </div>
        <div>
          <label>Invoice Notes</label>
          <input type="text" v-model="invoiceNotes" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  `,
}).mount('#content');