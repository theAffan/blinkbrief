import json
import requests
import wikipedia
from newspaper import Article
from core.settings import HF_API_KEY
from youtube_transcript_api import YouTubeTranscriptApi


class SummarizerService:
    @staticmethod
    def get_youtube_transcript(link: str) -> str:
        video_id = link.split("=")[-1]
        subtitle = YouTubeTranscriptApi.get_transcript(video_id=video_id)
        joined_subtitles = " ".join([sub["text"] for sub in subtitle])
        return joined_subtitles

    @staticmethod
    def bart_inference(text: str, percent: int) -> str:
        total_length = len(text.split(" "))
        min_length = (total_length * percent) // 100

        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        url = "https://api-inference.huggingface.co/models/google/pegasus-large"

        data = json.dumps(
            {
                "inputs": text,
                "parameters": {
                    "min_length": min_length,
                    "max_length": (min_length + 60),
                    "do_sample": False,
                },
            }
        )

        response = requests.request("POST", url, headers=headers, data=data)
        print(response)
        print(response.json())
        return json.loads(response.content.decode("utf-8"))

    @staticmethod
    def summarize_youtube_transcript(link: str, percent: int) -> str:
        transcript_content = SummarizerService.get_youtube_transcript(link)
        result = SummarizerService.bart_inference(transcript_content, percent)
        return result

    @staticmethod
    def summarize_wikipedia_articles(query: str) -> str:
        return wikipedia.summary(query)

    @staticmethod
    def summarize_news_articles(link: str) -> str:
        article = Article(link)
        article.download()
        article.parse()
        article.nlp()
        return article.summary
