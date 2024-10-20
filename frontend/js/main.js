const API_KEY = 'AIzaSyCazZOga5qSqjCx1a246XCqxhnUxUkeOPQ'; // Thay bằng API key của bạn
const CHANNEL_IDS = [
  'UCL_qhgtOy0dy1Agp8vkySQg', // Thay bằng ID kênh MusicStore
  'UCHsx4Hqa-1ORjQTh9TYDhww' // ID của kênh thứ hai
];

const app = Vue.createApp({
  data() {
      return {
          videos: [],
          currentVideoId: '',
      };
  },
  computed: {
      currentVideoSrc() {
          return this.currentVideoId ? `https://www.youtube.com/embed/${this.currentVideoId}?autoplay=1` : ''; // Kiểm tra có ID video hay không
      }
  },
  mounted() {
      this.fetchVideos();
  },
  methods: {
      async fetchVideos() {
          for (const channelId of CHANNEL_IDS) {
              const videoIds = await this.getVideoIds(channelId);
              await this.fetchVideoDetails(videoIds);
          }
          if (this.videos.length > 0) {
              this.currentVideoId = this.videos[0].id; // Bắt đầu với video đầu tiên
          }
      },
      async getVideoIds(channelId) {
          const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=id&type=video&maxResults=50`;
          try {
              const response = await axios.get(url);
              return response.data.items.map(item => item.id.videoId);
          } catch (error) {
              console.error('Error fetching video IDs:', error);
              return [];
          }
      },
      async fetchVideoDetails(videoIds) {
          const url = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=contentDetails,snippet`;
          try {
              const response = await axios.get(url);
              const newVideos = response.data.items
                  .filter(item => {
                      const duration = item.contentDetails.duration;
                      const match = duration.match(/PT(\d+)M(\d+)S/);
                      if (!match) return false;

                      const minutes = parseInt(match[1], 10) || 0;
                      const seconds = parseInt(match[2], 10) || 0;
                      const totalSeconds = minutes * 60 + seconds;
                      return totalSeconds <= 5 * 60; // Chỉ giữ video có thời lượng <= 5 phút
                  })
                  .map(item => ({
                      id: item.id,
                      title: item.snippet.title,
                      thumbnail: item.snippet.thumbnails.default.url // Thêm thumbnail cho video
                  }));

              this.videos = [...this.videos, ...newVideos];

              // Kiểm tra nếu có video và gán video đầu tiên vào currentVideoId
              if (this.videos.length > 0) {
                  this.currentVideoId = this.videos[0].id; // Cập nhật video hiện tại
              }
          } catch (error) {
              console.error('Error fetching video details:', error);
          }
      },
      playVideo(video) {
          this.currentVideoId = video.id; // Thay đổi video hiện tại khi người dùng nhấp
      }
  }
});

app.mount('#app');
