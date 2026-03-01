This quickstart shows you how to install our [libraries](https://ai.google.dev/gemini-api/docs/libraries)
and make your first Gemini API request.

## Before you begin

Using the Gemini API requires an API key, you can create one for free to get started.

[Create a Gemini API Key](https://aistudio.google.com/app/apikey)

## Install the Google GenAI SDK

### Python

Using [Python 3.9+](https://www.python.org/downloads/), install the
[`google-genai` package](https://pypi.org/project/google-genai/)
using the following
[pip command](https://packaging.python.org/en/latest/tutorials/installing-packages/):  

    pip install -q -U google-genai

### JavaScript

Using [Node.js v18+](https://nodejs.org/en/download/package-manager),
install the
[Google Gen AI SDK for TypeScript and JavaScript](https://www.npmjs.com/package/@google/genai)
using the following
[npm command](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):  

    npm install @google/genai

### Go

Install
[google.golang.org/genai](https://pkg.go.dev/google.golang.org/genai) in
your module directory using the [go get command](https://go.dev/doc/code):  

    go get google.golang.org/genai

### Java

If you're using Maven, you can install
[google-genai](https://github.com/googleapis/java-genai) by adding the
following to your dependencies:  

    <dependencies>
      <dependency>
        <groupId>com.google.genai</groupId>
        <artifactId>google-genai</artifactId>
        <version>1.0.0</version>
      </dependency>
    </dependencies>

### C#

Install
[googleapis/go-genai](https://googleapis.github.io/dotnet-genai/) in
your module directory using the [dotnet add command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-add)  

    dotnet add package Google.GenAI

### Apps Script

1. To create a new Apps Script project, go to [script.new](https://script.google.com/u/0/home/projects/create).
2. Click **Untitled project**.
3. Rename the Apps Script project **AI Studio** and click **Rename**.
4. Set your [API key](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)
   1. At the left, click **Project Settings** ![The icon for project settings](https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/settings/default/24px.svg).
   2. Under **Script Properties** click **Add script property**.
   3. For **Property** , enter the key name: `GEMINI_API_KEY`.
   4. For **Value**, enter the value for the API key.
   5. Click **Save script properties**.
5. Replace the `Code.gs` file contents with the following code:

## Make your first request

Here is an example that uses the
[`generateContent`](https://ai.google.dev/api/generate-content#method:-models.generatecontent) method
to send a request to the Gemini API using the Gemini 2.5 Flash model.

If you [set your API key](https://ai.google.dev/gemini-api/docs/api-key#set-api-env-var) as the
environment variable `GEMINI_API_KEY`, it will be picked up automatically by the
client when using the [Gemini API libraries](https://ai.google.dev/gemini-api/docs/libraries).
Otherwise you will need to [pass your API key](https://ai.google.dev/gemini-api/docs/api-key#provide-api-key-explicitly) as
an argument when initializing the client.

Note that all code samples in the Gemini API docs assume that you have set the
environment variable `GEMINI_API_KEY`.  

### Python

    from google import genai

    # The client gets the API key from the environment variable `GEMINI_API_KEY`.
    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents="Explain how AI works in a few words"
    )
    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Explain how AI works in a few words",
      });
      console.log(response.text);
    }

    main();

### Go

    package main

    import (
        "context"
        "fmt"
        "log"
        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        result, err := client.Models.GenerateContent(
            ctx,
            "gemini-3-flash-preview",
            genai.Text("Explain how AI works in a few words"),
            nil,
        )
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(result.Text())
    }

### Java

    package com.example;

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentResponse;

    public class GenerateTextFromTextInput {
      public static void main(String[] args) {
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        Client client = new Client();

        GenerateContentResponse response =
            client.models.generateContent(
                "gemini-3-flash-preview",
                "Explain how AI works in a few words",
                null);

        System.out.println(response.text());
      }
    }

### C#

    using System.Threading.Tasks;
    using Google.GenAI;
    using Google.GenAI.Types;

    public class GenerateContentSimpleText {
      public static async Task main() {
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        var client = new Client();
        var response = await client.Models.GenerateContentAsync(
          model: "gemini-3-flash-preview", contents: "Explain how AI works in a few words"
        );
        Console.WriteLine(response.Candidates[0].Content.Parts[0].Text);
      }
    }

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    function main() {
      const payload = {
        contents: [
          {
            parts: [
              { text: 'Explain how AI works in a few words' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in a few words"
              }
            ]
          }
        ]
      }'

<br />

When building with the Gemini API, we recommend using the **Google GenAI SDK** .
These are the official, production-ready libraries that we develop and maintain
for the most popular languages. They are in [General Availability](https://ai.google.dev/gemini-api/docs/libraries#new-libraries) and used in all our official
documentation and examples.
| **Note:** If you're using one of our legacy libraries, we strongly recommend you [migrate](https://ai.google.dev/gemini-api/docs/migrate) to the Google GenAI SDK. Review the [legacy libraries](https://ai.google.dev/gemini-api/docs/libraries#previous-sdks) section for more information.

If you're new to the Gemini API, follow our [quickstart guide](https://ai.google.dev/gemini-api/docs/quickstart) to get started.

## Language support and installation

The Google GenAI SDK is available for the Python, JavaScript/TypeScript, Go and
Java languages. You can install each language's library using package managers,
or visit their GitHub repos for further engagement:  

### Python

- Library: [`google-genai`](https://pypi.org/project/google-genai)

- GitHub Repository: [googleapis/python-genai](https://github.com/googleapis/python-genai)

- Installation: `pip install google-genai`

### JavaScript

- Library: [`@google/genai`](https://www.npmjs.com/package/@google/genai)

- GitHub Repository: [googleapis/js-genai](https://github.com/googleapis/js-genai)

- Installation: `npm install @google/genai`

### Go

- Library: [`google.golang.org/genai`](https://pkg.go.dev/google.golang.org/genai)

- GitHub Repository: [googleapis/go-genai](https://github.com/googleapis/go-genai)

- Installation: `go get google.golang.org/genai`

### Java

- Library: `google-genai`

- GitHub Repository: [googleapis/java-genai](https://github.com/googleapis/java-genai)

- Installation: If you're using Maven, add the following to your dependencies:

    <dependencies>
      <dependency>
        <groupId>com.google.genai</groupId>
        <artifactId>google-genai</artifactId>
        <version>1.0.0</version>
      </dependency>
    </dependencies>

### C#

- Library: `Google.GenAI`

- GitHub Repository: [googleapis/dotnet-genai](https://googleapis.github.io/dotnet-genai/)

- Installation: `dotnet add package Google.GenAI`

## General availability

As of May 2025, the Google GenAI SDK has reached General Availability (GA) across
all supported platforms and are the recommended libraries to access the Gemini API.
They are stable, fully supported for production use, and are actively maintained.
They provide access to the latest features, and offer the best performance working
with Gemini.

If you're using one of our legacy libraries,
we strongly recommend you migrate so that you can access the latest features and
get the best performance working with Gemini. Review the [legacy libraries](https://ai.google.dev/gemini-api/docs/libraries#previous-sdks) section for more information.

## Legacy libraries and migration

If you are using one of our legacy libraries, we recommend that you
[migrate to the new libraries](https://ai.google.dev/gemini-api/docs/migrate).

The legacy libraries don't provide access to recent features (such as
[Live API](https://ai.google.dev/gemini-api/docs/live) and [Veo](https://ai.google.dev/gemini-api/docs/video)) and are
deprecated as of November 30th, 2025.

Each legacy library's support status varies, detailed in the following table:

| Language | Legacy library | Support status | Recommended library |
|---|---|---|---|
| **Python** | [google-generativeai](https://github.com/google-gemini/deprecated-generative-ai-python) | Not actively maintained | [google-genai](https://github.com/googleapis/python-genai) |
| **JavaScript/TypeScript** | [@google/generativeai](https://github.com/google-gemini/generative-ai-js) | Not actively maintained | [@google/genai](https://github.com/googleapis/js-genai) |
| **Go** | [google.golang.org/generative-ai](https://github.com/google/generative-ai-go) | Not actively maintained | [google.golang.org/genai](https://github.com/googleapis/go-genai) |
| **Dart and Flutter** | [google_generative_ai](https://pub.dev/packages/google_generative_ai/install) | Not actively maintained | Use trusted community or third party libraries, like [firebase_ai](https://pub.dev/packages/firebase_ai), or access using REST API |
| **Swift** | [generative-ai-swift](https://github.com/google/generative-ai-swift) | Not actively maintained | Use [Firebase AI Logic](https://firebase.google.com/products/firebase-ai-logic) |
| **Android** | [generative-ai-android](https://github.com/google-gemini/generative-ai-android) | Not actively maintained | Use [Firebase AI Logic](https://firebase.google.com/products/firebase-ai-logic) |

**Note for Java developers:** There was no legacy Google-provided Java SDK for
the Gemini API, so no migration from a previous Google library is required. You
can start directly with the new library in the
[Language support and installation](https://ai.google.dev/gemini-api/docs/libraries#install) section.

## Prompt templates for code generation

Generative models (e.g., Gemini, Claude) and AI-powered IDEs (e.g., Cursor) may
produce code for the Gemini API using outdated or deprecated libraries due to
their training data cutoff. For the generated code to use the latest,
recommended libraries, provide version and usage guidance directly in your
prompts. You can use the templates below to provide the necessary context:

- [Python](https://github.com/googleapis/python-genai/blob/main/codegen_instructions.md)

- [JavaScript/TypeScript](https://github.com/googleapis/js-genai/blob/main/codegen_instructions.md)


The Gemini API can generate text output from text, images, video, and audio
inputs.

Here's a basic example:  

### Python

    from google import genai

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents="How does AI work?"
    )
    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "How does AI work?",
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3-flash-preview",
          genai.Text("Explain how AI works in a few words"),
          nil,
      )

      fmt.Println(result.Text())
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentResponse;

    public class GenerateContentWithTextInput {
      public static void main(String[] args) {

        Client client = new Client();

        GenerateContentResponse response =
            client.models.generateContent("gemini-3-flash-preview", "How does AI work?", null);

        System.out.println(response.text());
      }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "How does AI work?"
              }
            ]
          }
        ]
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const payload = {
        contents: [
          {
            parts: [
              { text: 'How AI does work?' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

## Thinking with Gemini

Gemini models often have ["thinking"](https://ai.google.dev/gemini-api/docs/thinking) enabled by default
which allows the model to reason before responding to a request.

Each model supports different thinking configurations which gives you control
over cost, latency, and intelligence. For more details, see the
[thinking guide](https://ai.google.dev/gemini-api/docs/thinking#set-budget).  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents="How does AI work?",
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="low")
        ),
    )
    print(response.text)

### JavaScript

    import { GoogleGenAI, ThinkingLevel } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "How does AI work?",
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        }
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      thinkingLevelVal := "low"

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3-flash-preview",
          genai.Text("How does AI work?"),
          &genai.GenerateContentConfig{
            ThinkingConfig: &genai.ThinkingConfig{
                ThinkingLevel: &thinkingLevelVal,
            },
          }
      )

      fmt.Println(result.Text())
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.ThinkingConfig;
    import com.google.genai.types.ThinkingLevel;

    public class GenerateContentWithThinkingConfig {
      public static void main(String[] args) {

        Client client = new Client();

        GenerateContentConfig config =
            GenerateContentConfig.builder()
                .thinkingConfig(ThinkingConfig.builder().thinkingLevel(new ThinkingLevel("low")))
                .build();

        GenerateContentResponse response =
            client.models.generateContent("gemini-3-flash-preview", "How does AI work?", config);

        System.out.println(response.text());
      }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "How does AI work?"
              }
            ]
          }
        ],
        "generationConfig": {
          "thinkingConfig": {
            "thinkingLevel": "low"
          }
        }
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const payload = {
        contents: [
          {
            parts: [
              { text: 'How AI does work?' },
            ],
          },
        ],
        generationConfig: {
          thinkingConfig: {
            thinkingLevel: 'low'
          }
        }
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

## System instructions and other configurations

You can guide the behavior of Gemini models with system instructions. To do so,
pass a [`GenerateContentConfig`](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig)
object.  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        config=types.GenerateContentConfig(
            system_instruction="You are a cat. Your name is Neko."),
        contents="Hello there"
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Hello there",
        config: {
          systemInstruction: "You are a cat. Your name is Neko.",
        },
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      config := &genai.GenerateContentConfig{
          SystemInstruction: genai.NewContentFromText("You are a cat. Your name is Neko.", genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3-flash-preview",
          genai.Text("Hello there"),
          config,
      )

      fmt.Println(result.Text())
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.Part;

    public class GenerateContentWithSystemInstruction {
      public static void main(String[] args) {

        Client client = new Client();

        GenerateContentConfig config =
            GenerateContentConfig.builder()
                .systemInstruction(
                    Content.fromParts(Part.fromText("You are a cat. Your name is Neko.")))
                .build();

        GenerateContentResponse response =
            client.models.generateContent("gemini-3-flash-preview", "Hello there", config);

        System.out.println(response.text());
      }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "system_instruction": {
          "parts": [
            {
              "text": "You are a cat. Your name is Neko."
            }
          ]
        },
        "contents": [
          {
            "parts": [
              {
                "text": "Hello there"
              }
            ]
          }
        ]
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const systemInstruction = {
        parts: [{
          text: 'You are a cat. Your name is Neko.'
        }]
      };

      const payload = {
        systemInstruction,
        contents: [
          {
            parts: [
              { text: 'Hello there' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

The [`GenerateContentConfig`](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig)
object also lets you override default generation parameters, such as
[temperature](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig).
When using Gemini 3 models, we strongly recommend keeping the `temperature` at its default value of 1.0. Changing the temperature (setting it below 1.0) may lead to unexpected behavior, such as looping or degraded performance, particularly in complex mathematical or reasoning tasks.  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=["Explain how AI works"],
        config=types.GenerateContentConfig(
            temperature=0.1
        )
    )
    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Explain how AI works",
        config: {
          temperature: 0.1,
        },
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      temp := float32(0.9)
      topP := float32(0.5)
      topK := float32(20.0)

      config := &genai.GenerateContentConfig{
        Temperature:       &temp,
        TopP:              &topP,
        TopK:              &topK,
        ResponseMIMEType:  "application/json",
      }

      result, _ := client.Models.GenerateContent(
        ctx,
        "gemini-3-flash-preview",
        genai.Text("What is the average size of a swallow?"),
        config,
      )

      fmt.Println(result.Text())
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;

    public class GenerateContentWithConfig {
      public static void main(String[] args) {

        Client client = new Client();

        GenerateContentConfig config = GenerateContentConfig.builder().temperature(0.1f).build();

        GenerateContentResponse response =
            client.models.generateContent("gemini-3-flash-preview", "Explain how AI works", config);

        System.out.println(response.text());
      }
    }

### REST

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works"
              }
            ]
          }
        ],
        "generationConfig": {
          "stopSequences": [
            "Title"
          ],
          "temperature": 1.0,
          "topP": 0.8,
          "topK": 10
        }
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        responseMimeType: 'text/plain',
      };

      const payload = {
        generationConfig,
        contents: [
          {
            parts: [
              { text: 'Explain how AI works in a few words' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

Refer to the [`GenerateContentConfig`](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig)
in our API reference for a complete list of configurable parameters and their
descriptions.

## Multimodal inputs

The Gemini API supports multimodal inputs, allowing you to combine text with
media files. The following example demonstrates providing an image:  

### Python

    from PIL import Image
    from google import genai

    client = genai.Client()

    image = Image.open("/path/to/organ.png")
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[image, "Tell me about this instrument"]
    )
    print(response.text)

### JavaScript

    import {
      GoogleGenAI,
      createUserContent,
      createPartFromUri,
    } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const image = await ai.files.upload({
        file: "/path/to/organ.png",
      });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          createUserContent([
            "Tell me about this instrument",
            createPartFromUri(image.uri, image.mimeType),
          ]),
        ],
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      imagePath := "/path/to/organ.jpg"
      imgData, _ := os.ReadFile(imagePath)

      parts := []*genai.Part{
          genai.NewPartFromText("Tell me about this instrument"),
          &genai.Part{
              InlineData: &genai.Blob{
                  MIMEType: "image/jpeg",
                  Data:     imgData,
              },
          },
      }

      contents := []*genai.Content{
          genai.NewContentFromParts(parts, genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3-flash-preview",
          contents,
          nil,
      )

      fmt.Println(result.Text())
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.Content;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.Part;

    public class GenerateContentWithMultiModalInputs {
      public static void main(String[] args) {

        Client client = new Client();

        Content content =
          Content.fromParts(
              Part.fromText("Tell me about this instrument"),
              Part.fromUri("/path/to/organ.jpg", "image/jpeg"));

        GenerateContentResponse response =
            client.models.generateContent("gemini-3-flash-preview", content, null);

        System.out.println(response.text());
      }
    }

### REST

    # Use a temporary file to hold the base64 encoded image data
    TEMP_B64=$(mktemp)
    trap 'rm -f "$TEMP_B64"' EXIT
    base64 $B64FLAGS $IMG_PATH > "$TEMP_B64"

    # Use a temporary file to hold the JSON payload
    TEMP_JSON=$(mktemp)
    trap 'rm -f "$TEMP_JSON"' EXIT

    cat > "$TEMP_JSON" << EOF
    {
      "contents": [
        {
          "parts": [
            {
              "text": "Tell me about this instrument"
            },
            {
              "inline_data": {
                "mime_type": "image/jpeg",
                "data": "$(cat "$TEMP_B64")"
              }
            }
          ]
        }
      ]
    }
    EOF

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d "@$TEMP_JSON"

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const imageUrl = 'http://image/url';
      const image = getImageData(imageUrl);
      const payload = {
        contents: [
          {
            parts: [
              { image },
              { text: 'Tell me about this instrument' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

    function getImageData(url) {
      const blob = UrlFetchApp.fetch(url).getBlob();

      return {
        mimeType: blob.getContentType(),
        data: Utilities.base64Encode(blob.getBytes())
      };
    }

For alternative methods of providing images and more advanced image processing,
see our [image understanding guide](https://ai.google.dev/gemini-api/docs/image-understanding).
The API also supports [document](https://ai.google.dev/gemini-api/docs/document-processing), [video](https://ai.google.dev/gemini-api/docs/video-understanding), and [audio](https://ai.google.dev/gemini-api/docs/audio)
inputs and understanding.

## Streaming responses

By default, the model returns a response only after the entire generation
process is complete.

For more fluid interactions, use streaming to receive [`GenerateContentResponse`](https://ai.google.dev/api/generate-content#v1beta.GenerateContentResponse) instances incrementally
as they're generated.  

### Python

    from google import genai

    client = genai.Client()

    response = client.models.generate_content_stream(
        model="gemini-3-flash-preview",
        contents=["Explain how AI works"]
    )
    for chunk in response:
        print(chunk.text, end="")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: "Explain how AI works",
      });

      for await (const chunk of response) {
        console.log(chunk.text);
      }
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      stream := client.Models.GenerateContentStream(
          ctx,
          "gemini-3-flash-preview",
          genai.Text("Write a story about a magic backpack."),
          nil,
      )

      for chunk, _ := range stream {
          part := chunk.Candidates[0].Content.Parts[0]
          fmt.Print(part.Text)
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.ResponseStream;
    import com.google.genai.types.GenerateContentResponse;

    public class GenerateContentStream {
      public static void main(String[] args) {

        Client client = new Client();

        ResponseStream<GenerateContentResponse> responseStream =
          client.models.generateContentStream(
              "gemini-3-flash-preview", "Write a story about a magic backpack.", null);

        for (GenerateContentResponse res : responseStream) {
          System.out.print(res.text());
        }

        // To save resources and avoid connection leaks, it is recommended to close the response
        // stream after consumption (or using try block to get the response stream).
        responseStream.close();
      }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      --no-buffer \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works"
              }
            ]
          }
        ]
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const payload = {
        contents: [
          {
            parts: [
              { text: 'Explain how AI works' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

## Multi-turn conversations (chat)

Our SDKs provide functionality to collect multiple rounds of prompts and
responses into a chat, giving you an easy way to keep track of the conversation
history.
**Note:** Chat functionality is only implemented as part of the SDKs. Behind the scenes, it still uses the [`generateContent`](https://ai.google.dev/api/generate-content#method:-models.generatecontent) API. For multi-turn conversations, the full conversation history is sent to the model with each follow-up turn.  

### Python

    from google import genai

    client = genai.Client()
    chat = client.chats.create(model="gemini-3-flash-preview")

    response = chat.send_message("I have 2 dogs in my house.")
    print(response.text)

    response = chat.send_message("How many paws are in my house?")
    print(response.text)

    for message in chat.get_history():
        print(f'role - {message.role}',end=": ")
        print(message.parts[0].text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });

      const response1 = await chat.sendMessage({
        message: "I have 2 dogs in my house.",
      });
      console.log("Chat response 1:", response1.text);

      const response2 = await chat.sendMessage({
        message: "How many paws are in my house?",
      });
      console.log("Chat response 2:", response2.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      history := []*genai.Content{
          genai.NewContentFromText("Hi nice to meet you! I have 2 dogs in my house.", genai.RoleUser),
          genai.NewContentFromText("Great to meet you. What would you like to know?", genai.RoleModel),
      }

      chat, _ := client.Chats.Create(ctx, "gemini-3-flash-preview", nil, history)
      res, _ := chat.SendMessage(ctx, genai.Part{Text: "How many paws are in my house?"})

      if len(res.Candidates) > 0 {
          fmt.Println(res.Candidates[0].Content.Parts[0].Text)
      }
    }

### Java

    import com.google.genai.Chat;
    import com.google.genai.Client;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentResponse;

    public class MultiTurnConversation {
      public static void main(String[] args) {

        Client client = new Client();
        Chat chatSession = client.chats.create("gemini-3-flash-preview");

        GenerateContentResponse response =
            chatSession.sendMessage("I have 2 dogs in my house.");
        System.out.println("First response: " + response.text());

        response = chatSession.sendMessage("How many paws are in my house?");
        System.out.println("Second response: " + response.text());

        // Get the history of the chat session.
        // Passing 'true' to getHistory() returns the curated history, which excludes
        // empty or invalid parts.
        // Passing 'false' here would return the comprehensive history, including
        // empty or invalid parts.
        ImmutableList<Content> history = chatSession.getHistory(true);
        System.out.println("History: " + history);
      }
    }

### REST

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "role": "user",
            "parts": [
              {
                "text": "Hello"
              }
            ]
          },
          {
            "role": "model",
            "parts": [
              {
                "text": "Great to meet you. What would you like to know?"
              }
            ]
          },
          {
            "role": "user",
            "parts": [
              {
                "text": "I have two dogs in my house. How many paws are in my house?"
              }
            ]
          }
        ]
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: 'Hello' },
            ],
          },
          {
            role: 'model',
            parts: [
              { text: 'Great to meet you. What would you like to know?' },
            ],
          },
          {
            role: 'user',
            parts: [
              { text: 'I have two dogs in my house. How many paws are in my house?' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

Streaming can also be used for multi-turn conversations.  

### Python

    from google import genai

    client = genai.Client()
    chat = client.chats.create(model="gemini-3-flash-preview")

    response = chat.send_message_stream("I have 2 dogs in my house.")
    for chunk in response:
        print(chunk.text, end="")

    response = chat.send_message_stream("How many paws are in my house?")
    for chunk in response:
        print(chunk.text, end="")

    for message in chat.get_history():
        print(f'role - {message.role}', end=": ")
        print(message.parts[0].text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });

      const stream1 = await chat.sendMessageStream({
        message: "I have 2 dogs in my house.",
      });
      for await (const chunk of stream1) {
        console.log(chunk.text);
        console.log("_".repeat(80));
      }

      const stream2 = await chat.sendMessageStream({
        message: "How many paws are in my house?",
      });
      for await (const chunk of stream2) {
        console.log(chunk.text);
        console.log("_".repeat(80));
      }
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {

      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      history := []*genai.Content{
          genai.NewContentFromText("Hi nice to meet you! I have 2 dogs in my house.", genai.RoleUser),
          genai.NewContentFromText("Great to meet you. What would you like to know?", genai.RoleModel),
      }

      chat, _ := client.Chats.Create(ctx, "gemini-3-flash-preview", nil, history)
      stream := chat.SendMessageStream(ctx, genai.Part{Text: "How many paws are in my house?"})

      for chunk, _ := range stream {
          part := chunk.Candidates[0].Content.Parts[0]
          fmt.Print(part.Text)
      }
    }

### Java

    import com.google.genai.Chat;
    import com.google.genai.Client;
    import com.google.genai.ResponseStream;
    import com.google.genai.types.GenerateContentResponse;

    public class MultiTurnConversationWithStreaming {
      public static void main(String[] args) {

        Client client = new Client();
        Chat chatSession = client.chats.create("gemini-3-flash-preview");

        ResponseStream<GenerateContentResponse> responseStream =
            chatSession.sendMessageStream("I have 2 dogs in my house.", null);

        for (GenerateContentResponse response : responseStream) {
          System.out.print(response.text());
        }

        responseStream = chatSession.sendMessageStream("How many paws are in my house?", null);

        for (GenerateContentResponse response : responseStream) {
          System.out.print(response.text());
        }

        // Get the history of the chat session. History is added after the stream
        // is consumed and includes the aggregated response from the stream.
        System.out.println("History: " + chatSession.getHistory(false));
      }
    }

### REST

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "role": "user",
            "parts": [
              {
                "text": "Hello"
              }
            ]
          },
          {
            "role": "model",
            "parts": [
              {
                "text": "Great to meet you. What would you like to know?"
              }
            ]
          },
          {
            "role": "user",
            "parts": [
              {
                "text": "I have two dogs in my house. How many paws are in my house?"
              }
            ]
          }
        ]
      }'

### Apps Script

    // See https://developers.google.com/apps-script/guides/properties
    // for instructions on how to set the API key.
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

    function main() {
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: 'Hello' },
            ],
          },
          {
            role: 'model',
            parts: [
              { text: 'Great to meet you. What would you like to know?' },
            ],
          },
          {
            role: 'user',
            parts: [
              { text: 'I have two dogs in my house. How many paws are in my house?' },
            ],
          },
        ],
      };

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent';
      const options = {
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'x-goog-api-key': apiKey,
        },
        payload: JSON.stringify(payload)
      };

      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response);
      const content = data['candidates'][0]['content']['parts'][0]['text'];
      console.log(content);
    }

## Prompting tips

Consult our [prompt engineering guide](https://ai.google.dev/gemini/docs/prompting-strategies) for
suggestions on getting the most out of Gemini.

## What's next

- Try [Gemini in Google AI Studio](https://aistudio.google.com).
- Experiment with [structured outputs](https://ai.google.dev/gemini-api/docs/structured-output) for JSON-like responses.
- Explore Gemini's [image](https://ai.google.dev/gemini-api/docs/image-understanding), [video](https://ai.google.dev/gemini-api/docs/video-understanding), [audio](https://ai.google.dev/gemini-api/docs/audio) and [document](https://ai.google.dev/gemini-api/docs/document-processing) understanding capabilities.
- Learn about multimodal [file prompting strategies](https://ai.google.dev/gemini-api/docs/files#prompt-guide).


Gemini 3 is our most intelligent model family to date, built on a foundation of
state-of-the-art reasoning. It is designed to bring any idea to life by
mastering agentic workflows, autonomous coding, and complex multimodal tasks.
This guide covers key features of the Gemini 3 model family and how to get the
most out of it.  
[Try Gemini 3 Pro](https://aistudio.google.com?model=gemini-3-pro-preview) [Try Gemini 3 Flash](https://aistudio.google.com?model=gemini-3-flash-preview) [Try Nano Banana Pro](https://aistudio.google.com?model=gemini-3-pro-image-preview)

Explore our [collection of Gemini 3 apps](https://aistudio.google.com/app/apps?source=showcase&showcaseTag=gemini-3) to
see how the model handles advanced reasoning, autonomous coding, and complex
multimodal tasks.

Get started with a few lines of code:  

### Python

    from google import genai

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents="Find the race condition in this multi-threaded C++ snippet: [code here]",
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function run() {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Find the race condition in this multi-threaded C++ snippet: [code here]",
      });

      console.log(response.text);
    }

    run();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [{"text": "Find the race condition in this multi-threaded C++ snippet: [code here]"}]
        }]
      }'

## Meet the Gemini 3 series

Gemini 3 Pro, the first model in the new series, is best for complex tasks that
require broad world knowledge and advanced reasoning across modalities.

Gemini 3 Flash is our latest 3-series model, with Pro-level intelligence at the
speed and pricing of Flash.

Nano Banana Pro (also known as Gemini 3 Pro Image) is our highest quality image
generation model yet.

All Gemini 3 models are currently in preview.

| Model ID | Context Window (In / Out) | Knowledge Cutoff | Pricing (Input / Output)\* |
|---|---|---|---|
| **gemini-3-pro-preview** | 1M / 64k | Jan 2025 | $2 / $12 (\<200k tokens) $4 / $18 (\>200k tokens) |
| **gemini-3-flash-preview** | 1M / 64k | Jan 2025 | $0.50 / $3 |
| **gemini-3-pro-image-preview** | 65k / 32k | Jan 2025 | $2 (Text Input) / $0.134 (Image Output)\*\* |

*\* Pricing is per 1 million tokens unless otherwise noted.*
*\*\* Image pricing varies by resolution. See the [pricing page](https://ai.google.dev/gemini-api/docs/pricing) for details.*

For detailed limits, pricing, and additional information, see the
[models page](https://ai.google.dev/gemini-api/docs/models/gemini).

## New API features in Gemini 3

Gemini 3 introduces new parameters designed to give developers more control over
latency, cost, and multimodal fidelity.

### Thinking level

Gemini 3 series models use dynamic thinking by default to reason through
prompts. You can use the `thinking_level` parameter, which controls the
**maximum** depth of the model's internal reasoning process before it produces a
response. Gemini 3 treats these levels as relative allowances for thinking
rather than strict token guarantees.

If `thinking_level` is not specified, Gemini 3 will default to `high`. For
faster, lower-latency responses when complex reasoning isn't required, you can
constrain the model's thinking level to `low`.

**Gemini 3 Pro and Flash thinking levels:**

The following thinking levels are supported by both Gemini 3 Pro and Flash:

- `low`: Minimizes latency and cost. Best for simple instruction following, chat, or high-throughput applications
- `high` (Default, dynamic): Maximizes reasoning depth. The model may take significantly longer to reach a first token, but the output will be more carefully reasoned.

**Gemini 3 Flash thinking levels**

In addition to the levels above, Gemini 3 Flash also supports the following
thinking levels that are not currently supported by Gemini 3 Pro:

- `minimal`: Matches the "no thinking" setting for most queries. The model may
  think very minimally for complex coding tasks. Minimizes latency for chat or
  high throughput applications.

  | **Note:** Circulation of [thought signatures](https://ai.google.dev/gemini-api/docs/gemini-3#thought_signatures) is required even when thinking level is set to `minimal` for Gemini 3 Flash.
- `medium`: Balanced thinking for most tasks.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents="How does AI work?",
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="low")
        ),
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "How does AI work?",
        config: {
          thinkingConfig: {
            thinkingLevel: "low",
          }
        },
      });

    console.log(response.text);

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [{"text": "How does AI work?"}]
        }],
        "generationConfig": {
          "thinkingConfig": {
            "thinkingLevel": "low"
          }
        }
      }'

| **Important:** You cannot use both `thinking_level` and the legacy `thinking_budget` parameter in the same request. Doing so will return a 400 error.

### Media resolution

Gemini 3 introduces granular control over multimodal vision processing via the
`media_resolution` parameter. Higher resolutions improve the model's ability to
read fine text or identify small details, but increase token usage and latency.
The `media_resolution` parameter determines the **maximum number of tokens
allocated per input image or video frame.**

You can now set the resolution to `media_resolution_low`,
`media_resolution_medium`, `media_resolution_high`, or
`media_resolution_ultra_high` per individual media part or globally (via
`generation_config`, global not available for ultra high). If unspecified, the
model uses optimal defaults based on the media type.

**Recommended settings**

| Media Type | Recommended Setting | Max Tokens | Usage Guidance |
|---|---|---|---|
| **Images** | `media_resolution_high` | 1120 | Recommended for most image analysis tasks to ensure maximum quality. |
| **PDFs** | `media_resolution_medium` | 560 | Optimal for document understanding; quality typically saturates at `medium`. Increasing to `high` rarely improves OCR results for standard documents. |
| **Video** (General) | `media_resolution_low` (or `media_resolution_medium`) | 70 (per frame) | **Note:** For video, `low` and `medium` settings are treated identically (70 tokens) to optimize context usage. This is sufficient for most action recognition and description tasks. |
| **Video** (Text-heavy) | `media_resolution_high` | 280 (per frame) | Required only when the use case involves reading dense text (OCR) or small details within video frames. |

**Note:** The `media_resolution` parameter maps to different token counts depending on the input type. While images scale linearly (`media_resolution_low`: 280, `media_resolution_medium`: 560, `media_resolution_high`: 1120), Video is compressed more aggressively. For Video, both `media_resolution_low` and `media_resolution_medium` are capped at 70 tokens per frame, and `media_resolution_high` is capped at 280 tokens. See full details [here](https://ai.google.dev/gemini-api/docs/media-resolution#token-counts)  

### Python

    from google import genai
    from google.genai import types
    import base64

    # The media_resolution parameter is currently only available in the v1alpha API version.
    client = genai.Client(http_options={'api_version': 'v1alpha'})

    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=[
            types.Content(
                parts=[
                    types.Part(text="What is in this image?"),
                    types.Part(
                        inline_data=types.Blob(
                            mime_type="image/jpeg",
                            data=base64.b64decode("..."),
                        ),
                        media_resolution={"level": "media_resolution_high"}
                    )
                ]
            )
        ]
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    // The media_resolution parameter is currently only available in the v1alpha API version.
    const ai = new GoogleGenAI({ apiVersion: "v1alpha" });

    async function run() {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [
          {
            parts: [
              { text: "What is in this image?" },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: "...",
                },
                mediaResolution: {
                  level: "media_resolution_high"
                }
              }
            ]
          }
        ]
      });

      console.log(response.text);
    }

    run();

### REST

    curl "https://generativelanguage.googleapis.com/v1alpha/models/gemini-3-pro-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [
            { "text": "What is in this image?" },
            {
              "inlineData": {
                "mimeType": "image/jpeg",
                "data": "..."
              },
              "mediaResolution": {
                "level": "media_resolution_high"
              }
            }
          ]
        }]
      }'

### Temperature

For Gemini 3, we strongly recommend keeping the temperature parameter at its
default value of `1.0`.

While previous models often benefited from tuning temperature to control
creativity versus determinism, Gemini 3's reasoning capabilities are optimized
for the default setting. Changing the temperature (setting it below 1.0) may
lead to unexpected behavior, such as looping or degraded performance,
particularly in complex mathematical or reasoning tasks.

### Thought signatures

Gemini 3 uses [Thought signatures](https://ai.google.dev/gemini-api/docs/thought-signatures) to
maintain reasoning context across API calls. These signatures are encrypted
representations of the model's internal thought process. To ensure the model
maintains its reasoning capabilities you must return these signatures back to
the model in your request exactly as they were received:

- **Function Calling (Strict):** The API enforces strict validation on the
  "Current Turn". Missing signatures will result in a 400 error.

  | **Note:** Circulation of thought signatures is required even when [thinking level](https://ai.google.dev/gemini-api/docs/gemini-3#thinking_level) is set to `minimal` for Gemini 3 Flash.
- **Text/Chat:** Validation is not strictly enforced, but omitting signatures will degrade the model's reasoning and answer quality.

- **Image generation/editing (Strict)** : The API enforces strict validation on all Model parts including a `thoughtSignature`. Missing signatures will result in a 400 error.

| **Success:** If you use the [official SDKs (Python, Node, Java)](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#thinking) and standard chat history, Thought Signatures are handled automatically. You do not need to manually manage these fields.

#### Function calling (strict validation)

When Gemini generates a `functionCall`, it relies on the `thoughtSignature` to
process the tool's output correctly in the next turn. The "Current Turn"
includes all Model (`functionCall`) and User (`functionResponse`) steps that
occurred since the last standard **User** `text` message.

- **Single Function Call:** The `functionCall` part contains a signature. You must return it.
- **Parallel Function Calls:** Only the first `functionCall` part in the list will contain the signature. You must return the parts in the exact order received.
- **Multi-Step (Sequential):** If the model calls a tool, receives a result, and calls *another* tool (within the same turn), **both** function calls have signatures. You must return **all** accumulated signatures in the history.

#### Text and streaming

For standard chat or text generation, the presence of a signature is not
guaranteed.

- **Non-Streaming** : The final content part of the response may contain a `thoughtSignature`, though it is not always present. If one is returned, you should send it back to maintain best performance.
- **Streaming**: If a signature is generated, it may arrive in a final chunk that contains an empty text part. Ensure your stream parser checks for signatures even if the text field is empty.

#### Image generation and editing

For `gemini-3-pro-image-preview`, thought signatures are critical for
conversational editing. When you ask the model to modify an image it relies on
the `thoughtSignature` from the previous turn to understand the composition and
logic of the original image.

- **Editing:** Signatures are guaranteed on the first part after the thoughts of the response (`text` or `inlineData`) and on every subsequent `inlineData` part. You must return all of these signatures to avoid errors.

#### Code examples

#### Multi-step Function Calling (Sequential)

The user asks a question requiring two separate steps (Check Flight -\> Book Taxi) in one turn.   


**Step 1: Model calls Flight Tool.**   

The model returns a signature `<Sig_A>`  

```java
// Model Response (Turn 1, Step 1)
  {
    "role": "model",
    "parts": [
      {
        "functionCall": { "name": "check_flight", "args": {...} },
        "thoughtSignature": "<Sig_A>" // SAVE THIS
      }
    ]
  }
```

**Step 2: User sends Flight Result**   

We must send back `<Sig_A>` to keep the model's train of thought.  

```java
// User Request (Turn 1, Step 2)
[
  { "role": "user", "parts": [{ "text": "Check flight AA100..." }] },
  { 
    "role": "model", 
    "parts": [
      { 
        "functionCall": { "name": "check_flight", "args": {...} }, 
        "thoughtSignature": "<Sig_A>" // REQUIRED
      } 
    ]
  },
  { "role": "user", "parts": [{ "functionResponse": { "name": "check_flight", "response": {...} } }] }
]
```

**Step 3: Model calls Taxi Tool**   

The model remembers the flight delay via `<Sig_A>` and now decides to book a taxi. It generates a *new* signature `<Sig_B>`.  

```java
// Model Response (Turn 1, Step 3)
{
  "role": "model",
  "parts": [
    {
      "functionCall": { "name": "book_taxi", "args": {...} },
      "thoughtSignature": "<Sig_B>" // SAVE THIS
    }
  ]
}
```

**Step 4: User sends Taxi Result**   

To complete the turn, you must send back the entire chain: `<Sig_A>` AND `<Sig_B>`.  

```java
// User Request (Turn 1, Step 4)
[
  // ... previous history ...
  { 
    "role": "model", 
    "parts": [
       { "functionCall": { "name": "check_flight", ... }, "thoughtSignature": "<Sig_A>" } 
    ]
  },
  { "role": "user", "parts": [{ "functionResponse": {...} }] },
  { 
    "role": "model", 
    "parts": [
       { "functionCall": { "name": "book_taxi", ... }, "thoughtSignature": "<Sig_B>" } 
    ]
  },
  { "role": "user", "parts": [{ "functionResponse": {...} }] }
]
```  

#### Parallel Function Calling

The user asks: "Check the weather in Paris and London." The model returns two function calls in one response.  

```java
// User Request (Sending Parallel Results)
[
  {
    "role": "user",
    "parts": [
      { "text": "Check the weather in Paris and London." }
    ]
  },
  {
    "role": "model",
    "parts": [
      // 1. First Function Call has the signature
      {
        "functionCall": { "name": "check_weather", "args": { "city": "Paris" } },
        "thoughtSignature": "<Signature_A>" 
      },
      // 2. Subsequent parallel calls DO NOT have signatures
      {
        "functionCall": { "name": "check_weather", "args": { "city": "London" } }
      } 
    ]
  },
  {
    "role": "user",
    "parts": [
      // 3. Function Responses are grouped together in the next block
      {
        "functionResponse": { "name": "check_weather", "response": { "temp": "15C" } }
      },
      {
        "functionResponse": { "name": "check_weather", "response": { "temp": "12C" } }
      }
    ]
  }
]
```  

#### Text/In-Context Reasoning (No Validation)

The user asks a question that requires in-context reasoning without external tools. While not strictly validated, including the signature helps the model maintain the reasoning chain for follow-up questions.  

```java
// User Request (Follow-up question)
[
  {
    "role": "user",
    "parts": [{ "text": "What are the risks of this investment?" }]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "I need to calculate the risk step-by-step. First, I'll look at volatility...",
        "thoughtSignature": "<Signature_C>" // Recommended to include
      }
    ]
  },
  {
    "role": "user",
    "parts": [{ "text": "Summarize that in one sentence." }]
  }
]
```  

#### Image Generation \& Editing

For image generation, signatures are strictly validated. They appear on the **first part** (text or image) and **all subsequent image parts**. All must be returned in the next turn.  

```java
// Model Response (Turn 1)
{
  "role": "model",
  "parts": [
    // 1. First part ALWAYS has a signature (even if text)
    {
      "text": "I will generate a cyberpunk city...",
      "thoughtSignature": "<Signature_D>"
    },
    // 2. ALL InlineData (Image) parts ALWAYS have signatures
    {
      "inlineData": { ... }, 
      "thoughtSignature": "<Signature_E>"
    },
  ]
}

// User Request (Turn 2 - Requesting an Edit)
{
  "contents": [
    // History must include ALL signatures received
    {
      "role": "user",
      "parts": [{ "text": "Generate a cyberpunk city" }]
    },
    {
      "role": "model",
      "parts": [
         { "text": "...", "thoughtSignature": "<Signature_D>" },
         { "inlineData": "...", "thoughtSignature": "<Signature_E>" },
      ]
    },
    // New User Prompt
    {
      "role": "user",
      "parts": [{ "text": "Make it daytime." }]
    }
  ]
}
```

#### Migrating from other models

If you are transferring a conversation trace from another model (e.g., Gemini
2.5) or injecting a custom function call that was not generated by Gemini 3,
you will not have a valid signature.

To bypass strict validation in these specific scenarios, populate the field with
this specific dummy string:
`"thoughtSignature": "context_engineering_is_the_way_to_go"`

### Structured Outputs with tools

Gemini 3 models allow you to combine [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output) with built-in tools, including
[Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search), [URL Context](https://ai.google.dev/gemini-api/docs/url-context), [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), and [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling).  

### Python

    from google import genai
    from google.genai import types
    from pydantic import BaseModel, Field
    from typing import List

    class MatchResult(BaseModel):
        winner: str = Field(description="The name of the winner.")
        final_match_score: str = Field(description="The final match score.")
        scorers: List[str] = Field(description="The name of the scorer.")

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents="Search for all details for the latest Euro.",
        config={
            "tools": [
                {"google_search": {}},
                {"url_context": {}}
            ],
            "response_mime_type": "application/json",
            "response_json_schema": MatchResult.model_json_schema(),
        },  
    )

    result = MatchResult.model_validate_json(response.text)
    print(result)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import { z } from "zod";
    import { zodToJsonSchema } from "zod-to-json-schema";

    const ai = new GoogleGenAI({});

    const matchSchema = z.object({
      winner: z.string().describe("The name of the winner."),
      final_match_score: z.string().describe("The final score."),
      scorers: z.array(z.string()).describe("The name of the scorer.")
    });

    async function run() {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Search for all details for the latest Euro.",
        config: {
          tools: [
            { googleSearch: {} },
            { urlContext: {} }
          ],
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(matchSchema),
        },
      });

      const match = matchSchema.parse(JSON.parse(response.text));
      console.log(match);
    }

    run();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [{"text": "Search for all details for the latest Euro."}]
        }],
        "tools": [
          {"googleSearch": {}},
          {"urlContext": {}}
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseJsonSchema": {
                "type": "object",
                "properties": {
                    "winner": {"type": "string", "description": "The name of the winner."},
                    "final_match_score": {"type": "string", "description": "The final score."},
                    "scorers": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "The name of the scorer."
                    }
                },
                "required": ["winner", "final_match_score", "scorers"]
            }
        }
      }'

### Image generation

Gemini 3 Pro Image lets you generate and edit images from text prompts. It uses
reasoning to "think" through a prompt and can retrieve real-time data---such as
weather forecasts or stock charts---before using [Google Search](https://ai.google.dev/gemini-api/docs/google-search) grounding before generating high-fidelity
images.

**New \& improved capabilities:**

- **4K \& text rendering:** Generate sharp, legible text and diagrams with up to 2K and 4K resolutions.
- **Grounded generation:** Use the `google_search` tool to verify facts and generate imagery based on real-world information.
- **Conversational editing:** Multi-turn image editing by simply asking for changes (e.g., "Make the background a sunset"). This workflow relies on **Thought Signatures** to preserve visual context between turns.

For complete details on aspect ratios, editing workflows, and configuration
options, see the [Image Generation guide](https://ai.google.dev/gemini-api/docs/image-generation).  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents="Generate an infographic of the current weather in Tokyo.",
        config=types.GenerateContentConfig(
            tools=[{"google_search": {}}],
            image_config=types.ImageConfig(
                aspect_ratio="16:9",
                image_size="4K"
            )
        )
    )

    image_parts = [part for part in response.parts if part.inline_data]

    if image_parts:
        image = image_parts[0].as_image()
        image.save('weather_tokyo.png')
        image.show()

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});

    async function run() {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: "Generate a visualization of the current weather in Tokyo.",
        config: {
          tools: [{ googleSearch: {} }],
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "4K"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          fs.writeFileSync("weather_tokyo.png", buffer);
        }
      }
    }

    run();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [{"text": "Generate a visualization of the current weather in Tokyo."}]
        }],
        "tools": [{"googleSearch": {}}],
        "generationConfig": {
            "imageConfig": {
              "aspectRatio": "16:9",
              "imageSize": "4K"
          }
        }
      }'

**Example Response**

![Weather Tokyo](https://ai.google.dev/static/gemini-api/docs/images/weather-tokyo.jpg)

### Code Execution with images

Gemini 3 Flash can treat vision as an active investigation, not just a static
glance. By combining reasoning with [code execution](https://ai.google.dev/gemini-api/docs/code-execution), the model formulates a plan, then writes and
executes Python code to zoom in, crop, annotate, or otherwise manipulate images
step-by-step to visually ground its answers.

**Use cases:**

- **Zoom and inspect:** The model implicitly detects when details are too small (e.g., reading a distant gauge or serial number) and writes code to crop and re-examine the area at higher resolution.
- **Visual math and plotting:** The model can run multi-step calculations using code (e.g., summing line items on a receipt, or generating a Matplotlib chart from extracted data).
- **Image annotation:** The model can draw arrows, bounding boxes, or other annotations directly onto images to answer spatial questions like "Where should this item go?".

To enable visual thinking, configure [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution) as a tool. The model will automatically use
code to manipulate images when needed.  

### Python

    from google import genai
    from google.genai import types
    import requests
    from PIL import Image
    import io

    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    image = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[
            image,
            "Zoom into the expression pedals and tell me how many pedals are there?"
        ],
        config=types.GenerateContentConfig(
            tools=[types.Tool(code_execution=types.ToolCodeExecution)]
        ),
    )

    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(part.text)
        if part.executable_code is not None:
            print(part.executable_code.code)
        if part.code_execution_result is not None:
            print(part.code_execution_result.output)
        if part.as_image() is not None:
            display(Image.open(io.BytesIO(part.as_image().image_bytes)))

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const imageUrl = "https://goo.gle/instrument-img";
      const response = await fetch(imageUrl);
      const imageArrayBuffer = await response.arrayBuffer();
      const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64ImageData,
            },
          },
          {
            text: "Zoom into the expression pedals and tell me how many pedals are there?",
          },
        ],
        config: {
          tools: [{ codeExecution: {} }],
        },
      });

      for (const part of result.candidates[0].content.parts) {
        if (part.text) {
          console.log("Text:", part.text);
        }
        if (part.executableCode) {
          console.log("Code:", part.executableCode.code);
        }
        if (part.codeExecutionResult) {
          console.log("Output:", part.codeExecutionResult.output);
        }
      }
    }

    main();

### REST

    IMG_URL="https://goo.gle/instrument-img"
    MODEL="gemini-3-flash-preview"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
                {
                  "inline_data": {
                    "mime_type":"'"$MIME_TYPE"'",
                    "data": "'"$IMAGE_B64"'"
                  }
                },
                {"text": "Zoom into the expression pedals and tell me how many pedals are there?"}
            ]
          }],
          "tools": [{"code_execution": {}}]
        }'

For more details on code execution with images, see [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution#images).

### Multimodal function responses

[Multimodal function calling](https://ai.google.dev/gemini-api/docs/function-calling#multimodal)
allows users to have function responses containing
multimodal objects allowing for improved utilization of function calling
capabilities of the model. Standard function calling only supports text-based
function responses:  

### Python

    from google import genai
    from google.genai import types

    import requests

    client = genai.Client()

    # This is a manual, two turn multimodal function calling workflow:

    # 1. Define the function tool
    get_image_declaration = types.FunctionDeclaration(
      name="get_image",
      description="Retrieves the image file reference for a specific order item.",
      parameters={
          "type": "object",
          "properties": {
              "item_name": {
                  "type": "string",
                  "description": "The name or description of the item ordered (e.g., 'instrument')."
              }
          },
          "required": ["item_name"],
      },
    )
    tool_config = types.Tool(function_declarations=[get_image_declaration])

    # 2. Send a message that triggers the tool
    prompt = "Show me the instrument I ordered last month."
    response_1 = client.models.generate_content(
      model="gemini-3-flash-preview",
      contents=[prompt],
      config=types.GenerateContentConfig(
          tools=[tool_config],
      )
    )

    # 3. Handle the function call
    function_call = response_1.function_calls[0]
    requested_item = function_call.args["item_name"]
    print(f"Model wants to call: {function_call.name}")

    # Execute your tool (e.g., call an API)
    # (This is a mock response for the example)
    print(f"Calling external tool for: {requested_item}")

    function_response_data = {
      "image_ref": {"$ref": "instrument.jpg"},
    }
    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    function_response_multimodal_data = types.FunctionResponsePart(
      inline_data=types.FunctionResponseBlob(
        mime_type="image/jpeg",
        display_name="instrument.jpg",
        data=image_bytes,
      )
    )

    # 4. Send the tool's result back
    # Append this turn's messages to history for a final response.
    history = [
      types.Content(role="user", parts=[types.Part(text=prompt)]),
      response_1.candidates[0].content,
      types.Content(
        role="tool",
        parts=[
            types.Part.from_function_response(
              name=function_call.name,
              response=function_response_data,
              parts=[function_response_multimodal_data]
            )
        ],
      )
    ]

    response_2 = client.models.generate_content(
      model="gemini-3-flash-preview",
      contents=history,
      config=types.GenerateContentConfig(
          tools=[tool_config],
          thinking_config=types.ThinkingConfig(include_thoughts=True)
      ),
    )

    print(f"\nFinal model response: {response_2.text}")

### JavaScript

    import { GoogleGenAI, Type } from '@google/genai';

    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // This is a manual, two turn multimodal function calling workflow:
    // 1. Define the function tool
    const getImageDeclaration = {
      name: 'get_image',
      description: 'Retrieves the image file reference for a specific order item.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          item_name: {
            type: Type.STRING,
            description: "The name or description of the item ordered (e.g., 'instrument').",
          },
        },
        required: ['item_name'],
      },
    };

    const toolConfig = {
      functionDeclarations: [getImageDeclaration],
    };

    // 2. Send a message that triggers the tool
    const prompt = 'Show me the instrument I ordered last month.';
    const response1 = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [toolConfig],
      },
    });

    // 3. Handle the function call
    const functionCall = response1.functionCalls[0];
    const requestedItem = functionCall.args.item_name;
    console.log(`Model wants to call: ${functionCall.name}`);

    // Execute your tool (e.g., call an API)
    // (This is a mock response for the example)
    console.log(`Calling external tool for: ${requestedItem}`);

    const functionResponseData = {
      image_ref: { $ref: 'instrument.jpg' },
    };

    const imageUrl = "https://goo.gle/instrument-img";
    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

    const functionResponseMultimodalData = {
      inlineData: {
        mimeType: 'image/jpeg',
        displayName: 'instrument.jpg',
        data: base64ImageData,
      },
    };

    // 4. Send the tool's result back
    // Append this turn's messages to history for a final response.
    const history = [
      { role: 'user', parts: [{ text: prompt }] },
      response1.candidates[0].content,
      {
        role: 'tool',
        parts: [
          {
            functionResponse: {
              name: functionCall.name,
              response: functionResponseData,
              parts: [functionResponseMultimodalData],
            },
          },
        ],
      },
    ];

    const response2 = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        tools: [toolConfig],
        thinkingConfig: { includeThoughts: true },
      },
    });

    console.log(`\nFinal model response: ${response2.text}`);

### REST

    IMG_URL="https://goo.gle/instrument-img"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    # Check for macOS
    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          ...,
          {
            "role": "user",
            "parts": [
            {
                "functionResponse": {
                  "name": "get_image",
                  "response": {
                    "image_ref": {
                      "$ref": "instrument.jpg"
                    }
                  },
                  "parts": [
                    {
                      "inlineData": {
                        "displayName": "instrument.jpg",
                        "mimeType":"'"$MIME_TYPE"'",
                        "data": "'"$IMAGE_B64"'"
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }'

## Migrating from Gemini 2.5

Gemini 3 is our most capable model family to date and offers a stepwise
improvement over Gemini 2.5. When migrating, consider the following:

- **Thinking:** If you were previously using complex prompt engineering (like chain of thought) to force Gemini 2.5 to reason, try Gemini 3 with `thinking_level: "high"` and simplified prompts.
- **Temperature settings:** If your existing code explicitly sets temperature (especially to low values for deterministic outputs), we recommend removing this parameter and using the Gemini 3 default of 1.0 to avoid potential looping issues or performance degradation on complex tasks.
- **PDF \& document understanding:** Default OCR resolution for PDFs has changed. If you relied on specific behavior for dense document parsing, test the new `media_resolution_high` setting to ensure continued accuracy.
- **Token consumption:** Migrating to Gemini 3 defaults may **increase** token usage for PDFs but **decrease** token usage for video. If requests now exceed the context window due to higher default resolutions, we recommend explicitly reducing the media resolution.
- **Image segmentation:** Image segmentation capabilities (returning pixel-level masks for objects) are not supported in Gemini 3 Pro or Gemini 3 Flash. For workloads requiring native image segmentation, we recommend continuing to utilize Gemini 2.5 Flash with thinking turned off or [Gemini Robotics-ER 1.5](https://ai.google.dev/gemini-api/docs/robotics-overview).
- **Computer Use:** Gemini 3 Pro and Gemini 3 Flash support Computer Use. Unlike the 2.5 series, you don't need to use a separate model to access the Computer Use tool.
- **Tool support**: Maps grounding is not yet supported for Gemini 3 models, so won't migrate. Additionally, combining built-in tools with function calling is not yet supported.

## OpenAI compatibility

For users utilizing the OpenAI compatibility layer, standard parameters are
automatically mapped to Gemini equivalents:

- `reasoning_effort` (OAI) maps to `thinking_level` (Gemini). Note that `reasoning_effort` medium maps to `thinking_level` high on Gemini 3 Flash.

## Prompting best practices

Gemini 3 is a reasoning model, which changes how you should prompt.

- **Precise instructions:** Be concise in your input prompts. Gemini 3 responds best to direct, clear instructions. It may over-analyze verbose or overly complex prompt engineering techniques used for older models.
- **Output verbosity:** By default, Gemini 3 is less verbose and prefers providing direct, efficient answers. If your use case requires a more conversational or "chatty" persona, you must explicitly steer the model in the prompt (e.g., "Explain this as a friendly, talkative assistant").
- **Context management:** When working with large datasets (e.g., entire books, codebases, or long videos), place your specific instructions or questions at the end of the prompt, after the data context. Anchor the model's reasoning to the provided data by starting your question with a phrase like, "Based on the information above...".

Learn more about prompt design strategies in the [prompt engineering guide](https://ai.google.dev/gemini-api/docs/prompting-strategies).

## FAQ

1. **What is the knowledge cutoff for Gemini 3?** Gemini 3 models have a
   knowledge cutoff of January 2025. For more recent information, use the
   [Search Grounding](https://ai.google.dev/gemini-api/docs/google-search) tool.

2. **What are the context window limits?** Gemini 3 models support a 1 million
   token input context window and up to 64k tokens of output.

3. **Is there a free tier for Gemini 3?** Gemini 3 Flash
   `gemini-3-flash-preview` has a free tier in the Gemini API. You can try both
   Gemini 3 Pro and Flash for free in Google AI Studio, but currently, there is no
   free tier available for `gemini-3-pro-preview` in the Gemini API.

4. **Will my old `thinking_budget` code still work?** Yes, `thinking_budget` is
   still supported for backward compatibility, but we recommend migrating to
   `thinking_level` for more predictable performance. Do not use both in the same
   request.

5. **Does Gemini 3 support the Batch API?** Yes, Gemini 3 supports the
   [Batch API](https://ai.google.dev/gemini-api/docs/batch-api).

6. **Is Context Caching supported?** Yes, [Context Caching](https://ai.google.dev/gemini-api/docs/caching) is supported for Gemini 3.

7. **Which tools are supported in Gemini 3?** Gemini 3 supports [Google Search](https://ai.google.dev/gemini-api/docs/google-search), [File Search](https://ai.google.dev/gemini-api/docs/file-search),
   [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), and [URL Context](https://ai.google.dev/gemini-api/docs/url-context). It also supports standard [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting) for your own custom tools
   (but not with built-in tools). Please note that [Grounding with Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding) and [Computer Use](https://ai.google.dev/gemini-api/docs/computer-use) are currently not supported.

   | **Note:** Gemini 3 billing for [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) will begin on January 5, 2026.

## Next steps

- Get started with the [Gemini 3 Cookbook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb#templateParams=%7B%22MODEL_ID%22%3A+%22gemini-3-pro-preview%22%7D)
- Check the dedicated Cookbook guide on [thinking levels](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_started_thinking_REST.ipynb#gemini3) and how to migrate from thinking budget to thinking levels.


Gemini models are built to be multimodal from the ground up, unlocking a wide
range of image processing and computer vision tasks including but not limited to
image captioning, classification, and visual question answering without having
to train specialized ML models.

In addition to their general multimodal capabilities, Gemini models offer
**enhanced accuracy** for specific use cases like [object detection](https://ai.google.dev/gemini-api/docs/image-understanding#object-detection) and [segmentation](https://ai.google.dev/gemini-api/docs/image-understanding#segmentation), through additional
training.

## Passing images to Gemini

You can provide images as input to Gemini using two methods:

- [Passing inline image data](https://ai.google.dev/gemini-api/docs/image-understanding#inline-image): Ideal for smaller files (total request size less than 20MB, including prompts).
- [Uploading images using the File API](https://ai.google.dev/gemini-api/docs/image-understanding#upload-image): Recommended for larger files or for reusing images across multiple requests.

### Passing inline image data

You can pass inline image data in the
request to `generateContent`. You can provide image data as Base64 encoded
strings or by reading local files directly (depending on the language).

The following example shows how to read an image from a local file and pass
it to `generateContent` API for processing.

### Python

      from google import genai
      from google.genai import types

      with open('path/to/small-sample.jpg', 'rb') as f:
          image_bytes = f.read()

      client = genai.Client()
      response = client.models.generate_content(
        model='gemini-3-flash-preview',
        contents=[
          types.Part.from_bytes(
            data=image_bytes,
            mime_type='image/jpeg',
          ),
          'Caption this image.'
        ]
      )

      print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});
    const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
      encoding: "base64",
    });

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
    });
    console.log(response.text);

### Go

    bytes, _ := os.ReadFile("path/to/small-sample.jpg")

    parts := []*genai.Part{
      genai.NewPartFromBytes(bytes, "image/jpeg"),
      genai.NewPartFromText("Caption this image."),
    }

    contents := []*genai.Content{
      genai.NewContentFromParts(parts, genai.RoleUser),
    }

    result, _ := client.Models.GenerateContent(
      ctx,
      "gemini-3-flash-preview",
      contents,
      nil,
    )

    fmt.Println(result.Text())

### REST

    IMG_PATH="/path/to/your/image1.jpg"

    if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
    B64FLAGS="--input"
    else
    B64FLAGS="-w0"
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
        "contents": [{
        "parts":[
            {
                "inline_data": {
                "mime_type":"image/jpeg",
                "data": "'"$(base64 $B64FLAGS $IMG_PATH)"'"
                }
            },
            {"text": "Caption this image."},
        ]
        }]
    }' 2> /dev/null

You can also fetch an image from a URL, convert it to bytes, and pass it to
`generateContent` as shown in the following examples.

### Python

    from google import genai
    from google.genai import types

    import requests

    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    image = types.Part.from_bytes(
      data=image_bytes, mime_type="image/jpeg"
    )

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=["What is this image?", image],
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    async function main() {
      const ai = new GoogleGenAI({});

      const imageUrl = "https://goo.gle/instrument-img";

      const response = await fetch(imageUrl);
      const imageArrayBuffer = await response.arrayBuffer();
      const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64ImageData,
          },
        },
        { text: "Caption this image." }
      ],
      });
      console.log(result.text);
    }

    main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "io"
      "net/http"
      "google.golang.org/genai"
    )

    func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      // Download the image.
      imageResp, _ := http.Get("https://goo.gle/instrument-img")

      imageBytes, _ := io.ReadAll(imageResp.Body)

      parts := []*genai.Part{
        genai.NewPartFromBytes(imageBytes, "image/jpeg"),
        genai.NewPartFromText("Caption this image."),
      }

      contents := []*genai.Content{
        genai.NewContentFromParts(parts, genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
        ctx,
        "gemini-3-flash-preview",
        contents,
        nil,
      )

      fmt.Println(result.Text())
    }

### REST

    IMG_URL="https://goo.gle/instrument-img"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    # Check for macOS
    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
                {
                  "inline_data": {
                    "mime_type":"'"$MIME_TYPE"'",
                    "data": "'"$IMAGE_B64"'"
                  }
                },
                {"text": "Caption this image."}
            ]
          }]
        }' 2> /dev/null

> [!NOTE]
> **Note:** Inline image data limits your total request size (text prompts, system instructions, and inline bytes) to 20MB. For larger requests, [upload image files](https://ai.google.dev/gemini-api/docs/image-understanding#upload-image) using the File API. Files API is also more efficient for scenarios that use the same image repeatedly.

### Uploading images using the File API

For large files or to be able to use the same image file repeatedly, use the
Files API. The following code uploads an image file and then uses the file in a
call to `generateContent`. See the [Files API guide](https://ai.google.dev/gemini-api/docs/files) for
more information and examples.

### Python

    from google import genai

    client = genai.Client()

    my_file = client.files.upload(file="path/to/sample.jpg")

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[my_file, "Caption this image."],
    )

    print(response.text)

### JavaScript

    import {
      GoogleGenAI,
      createUserContent,
      createPartFromUri,
    } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const myfile = await ai.files.upload({
        file: "path/to/sample.jpg",
        config: { mimeType: "image/jpeg" },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          "Caption this image.",
        ]),
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      uploadedFile, _ := client.Files.UploadFromPath(ctx, "path/to/sample.jpg", nil)

      parts := []*genai.Part{
          genai.NewPartFromText("Caption this image."),
          genai.NewPartFromURI(uploadedFile.URI, uploadedFile.MIMEType),
      }

      contents := []*genai.Content{
          genai.NewContentFromParts(parts, genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3-flash-preview",
          contents,
          nil,
      )

      fmt.Println(result.Text())
    }

### REST

    IMAGE_PATH="path/to/sample.jpg"
    MIME_TYPE=$(file -b --mime-type "${IMAGE_PATH}")
    NUM_BYTES=$(wc -c < "${IMAGE_PATH}")
    DISPLAY_NAME=IMAGE

    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "https://generativelanguage.googleapis.com/upload/v1beta/files" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${IMAGE_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq -r ".file.uri" file_info.json)
    echo file_uri=$file_uri

    # Now generate content using that file
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"file_data":{"mime_type": "'"${MIME_TYPE}"'", "file_uri": "'"${file_uri}"'"}},
              {"text": "Caption this image."}]
            }]
          }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json

## Prompting with multiple images

You can provide multiple images in a single prompt by including multiple image
`Part` objects in the `contents` array. These can be a mix of inline data
(local files or URLs) and File API references.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    # Upload the first image
    image1_path = "path/to/image1.jpg"
    uploaded_file = client.files.upload(file=image1_path)

    # Prepare the second image as inline data
    image2_path = "path/to/image2.png"
    with open(image2_path, 'rb') as f:
        img2_bytes = f.read()

    # Create the prompt with text and multiple images
    response = client.models.generate_content(

        model="gemini-3-flash-preview",
        contents=[
            "What is different between these two images?",
            uploaded_file,  # Use the uploaded file reference
            types.Part.from_bytes(
                data=img2_bytes,
                mime_type='image/png'
            )
        ]
    )

    print(response.text)

### JavaScript

    import {
      GoogleGenAI,
      createUserContent,
      createPartFromUri,
    } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});

    async function main() {
      // Upload the first image
      const image1_path = "path/to/image1.jpg";
      const uploadedFile = await ai.files.upload({
        file: image1_path,
        config: { mimeType: "image/jpeg" },
      });

      // Prepare the second image as inline data
      const image2_path = "path/to/image2.png";
      const base64Image2File = fs.readFileSync(image2_path, {
        encoding: "base64",
      });

      // Create the prompt with text and multiple images

      const response = await ai.models.generateContent({

        model: "gemini-3-flash-preview",
        contents: createUserContent([
          "What is different between these two images?",
          createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image2File,
            },
          },
        ]),
      });
      console.log(response.text);
    }

    await main();

### Go

    // Upload the first image
    image1Path := "path/to/image1.jpg"
    uploadedFile, _ := client.Files.UploadFromPath(ctx, image1Path, nil)

    // Prepare the second image as inline data
    image2Path := "path/to/image2.jpeg"
    imgBytes, _ := os.ReadFile(image2Path)

    parts := []*genai.Part{
      genai.NewPartFromText("What is different between these two images?"),
      genai.NewPartFromBytes(imgBytes, "image/jpeg"),
      genai.NewPartFromURI(uploadedFile.URI, uploadedFile.MIMEType),
    }

    contents := []*genai.Content{
      genai.NewContentFromParts(parts, genai.RoleUser),
    }

    result, _ := client.Models.GenerateContent(
      ctx,
      "gemini-3-flash-preview",
      contents,
      nil,
    )

    fmt.Println(result.Text())

### REST

    # Upload the first image
    IMAGE1_PATH="path/to/image1.jpg"
    MIME1_TYPE=$(file -b --mime-type "${IMAGE1_PATH}")
    NUM1_BYTES=$(wc -c < "${IMAGE1_PATH}")
    DISPLAY_NAME1=IMAGE1

    tmp_header_file1=upload-header1.tmp

    curl "https://generativelanguage.googleapis.com/upload/v1beta/files" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -D upload-header1.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM1_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME1_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME1}'}}" 2> /dev/null

    upload_url1=$(grep -i "x-goog-upload-url: " "${tmp_header_file1}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file1}"

    curl "${upload_url1}" \
      -H "Content-Length: ${NUM1_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${IMAGE1_PATH}" 2> /dev/null > file_info1.json

    file1_uri=$(jq ".file.uri" file_info1.json)
    echo file1_uri=$file1_uri

    # Prepare the second image (inline)
    IMAGE2_PATH="path/to/image2.png"
    MIME2_TYPE=$(file -b --mime-type "${IMAGE2_PATH}")

    if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      B64FLAGS="--input"
    else
      B64FLAGS="-w0"
    fi
    IMAGE2_BASE64=$(base64 $B64FLAGS $IMAGE2_PATH)

    # Now generate content using both images
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "What is different between these two images?"},
              {"file_data":{"mime_type": "'"${MIME1_TYPE}"'", "file_uri": '$file1_uri'}},
              {
                "inline_data": {
                  "mime_type":"'"${MIME2_TYPE}"'",
                  "data": "'"$IMAGE2_BASE64"'"
                }
              }
            ]
          }]
        }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json

## Object detection

Models are trained to detect objects in an
image and get their bounding box coordinates. The coordinates, relative to image
dimensions, scale to \[0, 1000\]. You need to descale these coordinates based on
your original image size.

### Python

    from google import genai
    from google.genai import types
    from PIL import Image
    import json

    client = genai.Client()
    prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."

    image = Image.open("/path/to/image.png")

    config = types.GenerateContentConfig(
      response_mime_type="application/json"
      )

    response = client.models.generate_content(model="gemini-3-flash-preview",
                                              contents=[image, prompt],
                                              config=config
                                              )

    width, height = image.size
    bounding_boxes = json.loads(response.text)

    converted_bounding_boxes = []
    for bounding_box in bounding_boxes:
        abs_y1 = int(bounding_box["box_2d"][0]/1000 * height)
        abs_x1 = int(bounding_box["box_2d"][1]/1000 * width)
        abs_y2 = int(bounding_box["box_2d"][2]/1000 * height)
        abs_x2 = int(bounding_box["box_2d"][3]/1000 * width)
        converted_bounding_boxes.append([abs_x1, abs_y1, abs_x2, abs_y2])

    print("Image size: ", width, height)
    print("Bounding boxes:", converted_bounding_boxes)

> [!NOTE]
> **Note:** The model also supports generating bounding boxes based on custom instructions, such as: "Show bounding boxes of all green objects in this image". It also support custom labels like "label the items with the allergens they can contain".

For more examples, check following notebooks in the [Gemini Cookbook](https://github.com/google-gemini/cookbook):

- [2D spatial understanding notebook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Spatial_understanding.ipynb)
- [Experimental 3D pointing notebook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/examples/Spatial_understanding_3d.ipynb)

## Segmentation

Starting with Gemini 2.5, models not only detect items but also segment them
and provide their contour masks.

The model predicts a JSON list, where each item represents a segmentation mask.
Each item has a bounding box ("`box_2d`") in the format `[y0, x0, y1, x1]` with
normalized coordinates between 0 and 1000, a label ("`label`") that identifies
the object, and finally the segmentation mask inside the bounding box, as base64
encoded png that is a probability map with values between 0 and 255.
The mask needs to be resized to match the bounding box dimensions, then
binarized at your confidence threshold (127 for the midpoint).

> [!NOTE]
> **Note:** For better results, disable [thinking](https://ai.google.dev/gemini-api/docs/thinking) by setting the thinking budget to 0. See code sample below for an example.

### Python

    from google import genai
    from google.genai import types
    from PIL import Image, ImageDraw
    import io
    import base64
    import json
    import numpy as np
    import os

    client = genai.Client()

    def parse_json(json_output: str):
      # Parsing out the markdown fencing
      lines = json_output.splitlines()
      for i, line in enumerate(lines):
        if line == "```json":
          json_output = "\n".join(lines[i+1:])  # Remove everything before "```json"
          output = json_output.split("```")[0]  # Remove everything after the closing "```"
          break  # Exit the loop once "```json" is found
      return json_output

    def extract_segmentation_masks(image_path: str, output_dir: str = "segmentation_outputs"):
      # Load and resize image
      im = Image.open(image_path)
      im.thumbnail([1024, 1024], Image.Resampling.LANCZOS)

      prompt = """
      Give the segmentation masks for the wooden and glass items.
      Output a JSON list of segmentation masks where each entry contains the 2D
      bounding box in the key "box_2d", the segmentation mask in key "mask", and
      the text label in the key "label". Use descriptive labels.
      """

      config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=0) # set thinking_budget to 0 for better results in object detection
      )

      response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[prompt, im], # Pillow images can be directly passed as inputs (which will be converted by the SDK)
        config=config
      )

      # Parse JSON response
      items = json.loads(parse_json(response.text))

      # Create output directory
      os.makedirs(output_dir, exist_ok=True)

      # Process each mask
      for i, item in enumerate(items):
          # Get bounding box coordinates
          box = item["box_2d"]
          y0 = int(box[0] / 1000 * im.size[1])
          x0 = int(box[1] / 1000 * im.size[0])
          y1 = int(box[2] / 1000 * im.size[1])
          x1 = int(box[3] / 1000 * im.size[0])

          # Skip invalid boxes
          if y0 >= y1 or x0 >= x1:
              continue

          # Process mask
          png_str = item["mask"]
          if not png_str.startswith("data:image/png;base64,"):
              continue

          # Remove prefix
          png_str = png_str.removeprefix("data:image/png;base64,")
          mask_data = base64.b64decode(png_str)
          mask = Image.open(io.BytesIO(mask_data))

          # Resize mask to match bounding box
          mask = mask.resize((x1 - x0, y1 - y0), Image.Resampling.BILINEAR)

          # Convert mask to numpy array for processing
          mask_array = np.array(mask)

          # Create overlay for this mask
          overlay = Image.new('RGBA', im.size, (0, 0, 0, 0))
          overlay_draw = ImageDraw.Draw(overlay)

          # Create overlay for the mask
          color = (255, 255, 255, 200)
          for y in range(y0, y1):
              for x in range(x0, x1):
                  if mask_array[y - y0, x - x0] > 128:  # Threshold for mask
                      overlay_draw.point((x, y), fill=color)

          # Save individual mask and its overlay
          mask_filename = f"{item['label']}_{i}_mask.png"
          overlay_filename = f"{item['label']}_{i}_overlay.png"

          mask.save(os.path.join(output_dir, mask_filename))

          # Create and save overlay
          composite = Image.alpha_composite(im.convert('RGBA'), overlay)
          composite.save(os.path.join(output_dir, overlay_filename))
          print(f"Saved mask and overlay for {item['label']} to {output_dir}")

    # Example usage
    if __name__ == "__main__":
      extract_segmentation_masks("path/to/image.png")

Check the
[segmentation example](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Spatial_understanding.ipynb#scrollTo=WQJTJ8wdGOKx)
in the cookbook guide for a more detailed example.
![A table with cupcakes, with the wooden and glass objects highlighted](https://ai.google.dev/static/gemini-api/docs/images/segmentation.jpg) An example segmentation output with objects and segmentation masks

## Supported image formats

Gemini supports the following image format MIME types:

- PNG - `image/png`
- JPEG - `image/jpeg`
- WEBP - `image/webp`
- HEIC - `image/heic`
- HEIF - `image/heif`

To learn about other file input methods, see the
[File input methods](https://ai.google.dev/gemini-api/docs/file-input-methods) guide.

## Capabilities

All Gemini model versions are multimodal and can be utilized in a wide range of
image processing and computer vision tasks including but not limited to image captioning,
visual question and answering, image classification, object detection and segmentation.

Gemini can reduce the need to use specialized ML models depending on your quality and performance requirements.

The latest model versions are specifically trained improve accuracy of
specialized tasks in addition to generic capabilities, like enhanced
[object detection](https://ai.google.dev/gemini-api/docs/image-understanding#object-detection) and [segmentation](https://ai.google.dev/gemini-api/docs/image-understanding#segmentation).

## Limitations and key technical information

### File limit

Gemini models support a maximum of 3,600 image files per request.

### Token calculation

- 258 tokens if both dimensions \<= 384 pixels. Larger images are tiled into 768x768 pixel tiles, each costing 258 tokens.

A rough formula for calculating the number of tiles is as follows:

- Calculate the crop unit size which is roughly: floor(min(width, height) / 1.5).
- Divide each dimension by the crop unit size and multiply together to get the number of tiles.

For example, for an image of dimensions 960x540 would have a crop unit size
of 360. Divide each dimension by 360 and the number of tile is 3 \* 2 = 6.

### Media resolution

Gemini 3 introduces granular control over multimodal vision processing with the
`media_resolution` parameter. The `media_resolution` parameter determines the
**maximum number of tokens allocated per input image or video frame.**
Higher resolutions improve the model's ability to
read fine text or identify small details, but increase token usage and latency.

For more details about the parameter and how it can impact token calculations,
see the [media resolution](https://ai.google.dev/gemini-api/docs/media-resolution) guide.

## Tips and best practices

- Verify that images are correctly rotated.
- Use clear, non-blurry images.
- When using a single image with text, place the text prompt *after* the image part in the `contents` array.

## What's next

This guide shows you how to upload image files and generate text outputs from image
inputs. To learn more, see the following resources:

- [Files API](https://ai.google.dev/gemini-api/docs/files): Learn more about uploading and managing files for use with Gemini.
- [System instructions](https://ai.google.dev/gemini-api/docs/text-generation#system-instructions): System instructions let you steer the behavior of the model based on your specific needs and use cases.
- [File prompting strategies](https://ai.google.dev/gemini-api/docs/files#prompt-guide): The Gemini API supports prompting with text, image, audio, and video data, also known as multimodal prompting.
- [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance): Sometimes generative AI models produce unexpected outputs, such as outputs that are inaccurate, biased, or offensive. Post-processing and human evaluation are essential to limit the risk of harm from such outputs.

You can configure Gemini models to generate responses that adhere to a provided JSON
Schema. This ensures predictable, type-safe results and simplifies extracting
structured data from unstructured text.

Using structured outputs is ideal for:

- **Data extraction:** Pull specific information like names and dates from text.
- **Structured classification:** Classify text into predefined categories.
- **Agentic workflows:** Generate structured inputs for tools or APIs.

In addition to supporting JSON Schema in the REST API, the Google GenAI SDKs
make it easy to define schemas using
[Pydantic](https://docs.pydantic.dev/latest/) (Python) and
[Zod](https://zod.dev/) (JavaScript).

<button value="recipe" default="">Recipe Extractor</button> <button value="feedback">Content Moderation</button> <button value="recursive">Recursive Structures</button>

This example demonstrates how to extract structured data from text using basic JSON Schema types like `object`, `array`, `string`, and `integer`.

### Python

    from google import genai
    from pydantic import BaseModel, Field
    from typing import List, Optional

    class Ingredient(BaseModel):
        name: str = Field(description="Name of the ingredient.")
        quantity: str = Field(description="Quantity of the ingredient, including units.")

    class Recipe(BaseModel):
        recipe_name: str = Field(description="The name of the recipe.")
        prep_time_minutes: Optional[int] = Field(description="Optional time in minutes to prepare the recipe.")
        ingredients: List[Ingredient]
        instructions: List[str]

    client = genai.Client()

    prompt = """
    Please extract the recipe from the following text.
    The user wants to make delicious chocolate chip cookies.
    They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
    1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
    3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
    For the best part, they'll need 2 cups of semisweet chocolate chips.
    First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
    baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
    until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
    ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
    onto ungreased baking sheets and bake for 9 to 11 minutes.
    """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_json_schema": Recipe.model_json_schema(),
        },
    )

    recipe = Recipe.model_validate_json(response.text)
    print(recipe)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import { z } from "zod";
    import { zodToJsonSchema } from "zod-to-json-schema";

    const ingredientSchema = z.object({
      name: z.string().describe("Name of the ingredient."),
      quantity: z.string().describe("Quantity of the ingredient, including units."),
    });

    const recipeSchema = z.object({
      recipe_name: z.string().describe("The name of the recipe."),
      prep_time_minutes: z.number().optional().describe("Optional time in minutes to prepare the recipe."),
      ingredients: z.array(ingredientSchema),
      instructions: z.array(z.string()),
    });

    const ai = new GoogleGenAI({});

    const prompt = `
    Please extract the recipe from the following text.
    The user wants to make delicious chocolate chip cookies.
    They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
    1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
    3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
    For the best part, they'll need 2 cups of semisweet chocolate chips.
    First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
    baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
    until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
    ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
    onto ungreased baking sheets and bake for 9 to 11 minutes.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(recipeSchema),
      },
    });

    const recipe = recipeSchema.parse(JSON.parse(response.text));
    console.log(recipe);

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        prompt := `
      Please extract the recipe from the following text.
      The user wants to make delicious chocolate chip cookies.
      They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
      1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
      3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
      For the best part, they'll need 2 cups of semisweet chocolate chips.
      First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
      baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
      until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
      ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
      onto ungreased baking sheets and bake for 9 to 11 minutes.
      `
        config := &genai.GenerateContentConfig{
            ResponseMIMEType: "application/json",
            ResponseJsonSchema: map[string]any{
                "type": "object",
                "properties": map[string]any{
                    "recipe_name": map[string]any{
                        "type":        "string",
                        "description": "The name of the recipe.",
                    },
                    "prep_time_minutes": map[string]any{
                        "type":        "integer",
                        "description": "Optional time in minutes to prepare the recipe.",
                    },
                    "ingredients": map[string]any{
                        "type": "array",
                        "items": map[string]any{
                            "type": "object",
                            "properties": map[string]any{
                                "name": map[string]any{
                                    "type":        "string",
                                    "description": "Name of the ingredient.",
                                },
                                "quantity": map[string]any{
                                    "type":        "string",
                                    "description": "Quantity of the ingredient, including units.",
                                },
                            },
                            "required": []string{"name", "quantity"},
                        },
                    },
                    "instructions": map[string]any{
                        "type":  "array",
                        "items": map[string]any{"type": "string"},
                    },
                },
                "required": []string{"recipe_name", "ingredients", "instructions"},
            },
        }

        result, err := client.Models.GenerateContent(
            ctx,
            "gemini-3-flash-preview",
            genai.Text(prompt),
            config,
        )
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(result.Text())
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              { "text": "Please extract the recipe from the following text.\nThe user wants to make delicious chocolate chip cookies.\nThey need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,\n1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,\n3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.\nFor the best part, they will need 2 cups of semisweet chocolate chips.\nFirst, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,\nbaking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar\nuntil light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry\ningredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons\nonto ungreased baking sheets and bake for 9 to 11 minutes." }
            ]
          }],
          "generationConfig": {
            "responseMimeType": "application/json",
            "responseJsonSchema": {
              "type": "object",
              "properties": {
                "recipe_name": {
                  "type": "string",
                  "description": "The name of the recipe."
                },
                "prep_time_minutes": {
                    "type": "integer",
                    "description": "Optional time in minutes to prepare the recipe."
                },
                "ingredients": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string", "description": "Name of the ingredient."},
                      "quantity": { "type": "string", "description": "Quantity of the ingredient, including units."}
                    },
                    "required": ["name", "quantity"]
                  }
                },
                "instructions": {
                  "type": "array",
                  "items": { "type": "string" }
                }
              },
              "required": ["recipe_name", "ingredients", "instructions"]
            }
          }
        }'

**Example Response:**

    {
      "recipe_name": "Delicious Chocolate Chip Cookies",
      "ingredients": [
        {
          "name": "all-purpose flour",
          "quantity": "2 and 1/4 cups"
        },
        {
          "name": "baking soda",
          "quantity": "1 teaspoon"
        },
        {
          "name": "salt",
          "quantity": "1 teaspoon"
        },
        {
          "name": "unsalted butter (softened)",
          "quantity": "1 cup"
        },
        {
          "name": "granulated sugar",
          "quantity": "3/4 cup"
        },
        {
          "name": "packed brown sugar",
          "quantity": "3/4 cup"
        },
        {
          "name": "vanilla extract",
          "quantity": "1 teaspoon"
        },
        {
          "name": "large eggs",
          "quantity": "2"
        },
        {
          "name": "semisweet chocolate chips",
          "quantity": "2 cups"
        }
      ],
      "instructions": [
        "Preheat the oven to 375°F (190°C).",
        "In a small bowl, whisk together the flour, baking soda, and salt.",
        "In a large bowl, cream together the butter, granulated sugar, and brown sugar until light and fluffy.",
        "Beat in the vanilla and eggs, one at a time.",
        "Gradually beat in the dry ingredients until just combined.",
        "Stir in the chocolate chips.",
        "Drop by rounded tablespoons onto ungreased baking sheets and bake for 9 to 11 minutes."
      ]
    }

## Streaming

You can stream structured outputs, which allows you to start processing the response as it's being generated, without having to wait for the entire output to be complete. This can improve the perceived performance of your application.

The streamed chunks will be valid partial JSON strings, which can be concatenated to form the final, complete JSON object.

### Python

    from google import genai
    from pydantic import BaseModel, Field
    from typing import Literal

    class Feedback(BaseModel):
        sentiment: Literal["positive", "neutral", "negative"]
        summary: str

    client = genai.Client()
    prompt = "The new UI is incredibly intuitive and visually appealing. Great job. Add a very long summary to test streaming!"

    response_stream = client.models.generate_content_stream(
        model="gemini-3-flash-preview",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_json_schema": Feedback.model_json_schema(),
        },
    )

    for chunk in response_stream:
        print(chunk.candidates[0].content.parts[0].text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import { z } from "zod";
    import { zodToJsonSchema } from "zod-to-json-schema";

    const ai = new GoogleGenAI({});
    const prompt = "The new UI is incredibly intuitive and visually appealing. Great job! Add a very long summary to test streaming!";

    const feedbackSchema = z.object({
      sentiment: z.enum(["positive", "neutral", "negative"]),
      summary: z.string(),
    });

    const stream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(feedbackSchema),
      },
    });

    for await (const chunk of stream) {
      console.log(chunk.candidates[0].content.parts[0].text)
    }

## Structured outputs with tools

| **Preview:** This is a feature available only for the Gemini 3 series models, `gemini-3-pro-preview` and `gemini-3-flash-preview`.

Gemini 3 lets you combine Structured Outputs with built-in tools, including
[Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search),
[URL Context](https://ai.google.dev/gemini-api/docs/url-context),
[Code Execution](https://ai.google.dev/gemini-api/docs/code-execution),
[File Search](https://ai.google.dev/gemini-api/docs/file-search#structured-output), and
[Function Calling](https://ai.google.dev/gemini-api/docs/function-calling).

### Python

    from google import genai
    from pydantic import BaseModel, Field
    from typing import List

    class MatchResult(BaseModel):
        winner: str = Field(description="The name of the winner.")
        final_match_score: str = Field(description="The final match score.")
        scorers: List[str] = Field(description="The name of the scorer.")

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents="Search for all details for the latest Euro.",
        config={
            "tools": [
                {"google_search": {}},
                {"url_context": {}}
            ],
            "response_mime_type": "application/json",
            "response_json_schema": MatchResult.model_json_schema(),
        },  
    )

    result = MatchResult.model_validate_json(response.text)
    print(result)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import { z } from "zod";
    import { zodToJsonSchema } from "zod-to-json-schema";

    const ai = new GoogleGenAI({});

    const matchSchema = z.object({
      winner: z.string().describe("The name of the winner."),
      final_match_score: z.string().describe("The final score."),
      scorers: z.array(z.string()).describe("The name of the scorer.")
    });

    async function run() {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Search for all details for the latest Euro.",
        config: {
          tools: [
            { googleSearch: {} },
            { urlContext: {} }
          ],
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(matchSchema),
        },
      });

      const match = matchSchema.parse(JSON.parse(response.text));
      console.log(match);
    }

    run();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [{
          "parts": [{"text": "Search for all details for the latest Euro."}]
        }],
        "tools": [
          {"googleSearch": {}},
          {"urlContext": {}}
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseJsonSchema": {
                "type": "object",
                "properties": {
                    "winner": {"type": "string", "description": "The name of the winner."},
                    "final_match_score": {"type": "string", "description": "The final score."},
                    "scorers": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "The name of the scorer."
                    }
                },
                "required": ["winner", "final_match_score", "scorers"]
            }
        }
      }'

## JSON schema support

To generate a JSON object, set the `response_mime_type` in the generation configuration to `application/json` and provide a `response_json_schema`. The schema must be a valid [JSON Schema](https://json-schema.org/) that describes the desired output format.

The model will then generate a response that is a syntactically valid JSON string matching the provided schema. When using structured outputs, the model will produce outputs in the same order as the keys in the schema.

Gemini's structured output mode supports a subset of the [JSON Schema](https://json-schema.org) specification.

The following values of `type` are supported:

- **`string`**: For text.
- **`number`**: For floating-point numbers.
- **`integer`**: For whole numbers.
- **`boolean`**: For true/false values.
- **`object`**: For structured data with key-value pairs.
- **`array`**: For lists of items.
- **`null`** : To allow a property to be null, include `"null"` in the type array (e.g., `{"type": ["string", "null"]}`).

These descriptive properties help guide the model:

- **`title`**: A short description of a property.
- **`description`**: A longer and more detailed description of a property.

### Type-specific properties

**For `object` values:**

- **`properties`**: An object where each key is a property name and each value is a schema for that property.
- **`required`**: An array of strings, listing which properties are mandatory.
- **`additionalProperties`** : Controls whether properties not listed in `properties` are allowed. Can be a boolean or a schema.

**For `string` values:**

- **`enum`**: Lists a specific set of possible strings for classification tasks.
- **`format`** : Specifies a syntax for the string, such as `date-time`, `date`, `time`.

**For `number` and `integer` values:**

- **`enum`**: Lists a specific set of possible numeric values.
- **`minimum`**: The minimum inclusive value.
- **`maximum`**: The maximum inclusive value.

**For `array` values:**

- **`items`**: Defines the schema for all items in the array.
- **`prefixItems`**: Defines a list of schemas for the first N items, allowing for tuple-like structures.
- **`minItems`**: The minimum number of items in the array.
- **`maxItems`**: The maximum number of items in the array.

## Model support

The following models support structured output:

| Model | Structured Outputs |
|---|---|
| Gemini 3 Pro Preview | ✔️ |
| Gemini 3 Flash Preview | ✔️ |
| Gemini 2.5 Pro | ✔️ |
| Gemini 2.5 Flash | ✔️ |
| Gemini 2.5 Flash-Lite | ✔️ |
| Gemini 2.0 Flash | ✔️\* |
| Gemini 2.0 Flash-Lite | ✔️\* |

*\* Note that Gemini 2.0 requires an explicit `propertyOrdering` list within the JSON input to define the preferred structure. You can find an example in this [cookbook](https://github.com/google-gemini/cookbook/blob/main/examples/Pdf_structured_outputs_on_invoices_and_forms.ipynb).*

## Structured outputs vs. function calling

Both structured outputs and function calling use JSON schemas, but they serve different purposes:

| Feature | Primary Use Case |
|---|---|
| **Structured Outputs** | **Formatting the final response to the user.** Use this when you want the model's *answer* to be in a specific format (e.g., extracting data from a document to save to a database). |
| **Function Calling** | **Taking action during the conversation.** Use this when the model needs to *ask you* to perform a task (e.g., "get current weather") before it can provide a final answer. |

## Best practices

- **Clear descriptions:** Use the `description` field in your schema to provide clear instructions to the model about what each property represents. This is crucial for guiding the model's output.
- **Strong typing:** Use specific types (`integer`, `string`, `enum`) whenever possible. If a parameter has a limited set of valid values, use an `enum`.
- **Prompt engineering:** Clearly state in your prompt what you want the model to do. For example, "Extract the following information from the text..." or "Classify this feedback according to the provided schema...".
- **Validation:** While structured output guarantees syntactically correct JSON, it does not guarantee the values are semantically correct. Always validate the final output in your application code before using it.
- **Error handling:** Implement robust error handling in your application to gracefully manage cases where the model's output, while schema-compliant, may not meet your business logic requirements.

## Limitations

- **Schema subset:** Not all features of the JSON Schema specification are supported. The model ignores unsupported properties.
- **Schema complexity:** The API may reject very large or deeply nested schemas. If you encounter errors, try simplifying your schema by shortening property names, reducing nesting, or limiting the number of constraints.

Many Gemini models come with large context windows of 1 million or more tokens.
Historically, large language models (LLMs) were significantly limited by
the amount of text (or tokens) that could be passed to the model at one time.
The Gemini long context window unlocks many new use cases and developer
paradigms.

The code you already use for cases like [text
generation](https://ai.google.dev/gemini-api/docs/text-generation) or [multimodal
inputs](https://ai.google.dev/gemini-api/docs/vision) will work without any changes with long context.

This document gives you an overview of what you can achieve using models with
context windows of 1M and more tokens. The page gives a brief overview of
a context window, and explores how developers should think about long context,
various real world use cases for long context, and ways to optimize the usage
of long context.

For the context window sizes of specific models, see the
[Models](https://ai.google.dev/gemini-api/docs/models) page.

## What is a context window?

The basic way you use the Gemini models is by passing information (context)
to the model, which will subsequently generate a response. An analogy for the
context window is short term memory. There is a limited amount of information
that can be stored in someone's short term memory, and the same is true for
generative models.

You can read more about how models work under the hood in our [generative models
guide](https://ai.google.dev/gemini-api/docs/prompting-strategies#under-the-hood).

## Getting started with long context

Earlier versions of generative models were only able to process 8,000
tokens at a time. Newer models pushed this further by accepting 32,000 or even
128,000 tokens. Gemini is the first model capable of accepting 1 million tokens.

In practice, 1 million tokens would look like:

- 50,000 lines of code (with the standard 80 characters per line)
- All the text messages you have sent in the last 5 years
- 8 average length English novels
- Transcripts of over 200 average length podcast episodes

The more limited context windows common in many other models often require
strategies like arbitrarily dropping old messages, summarizing content, using
RAG with vector databases, or filtering prompts to save tokens.

While these techniques remain valuable in specific scenarios, Gemini's extensive
context window invites a more direct approach: providing all relevant
information upfront. Because Gemini models were purpose-built with massive
context capabilities, they demonstrate powerful in-context learning. For
example, using only in-context instructional materials (a 500-page reference
grammar, a dictionary, and ≈400 parallel sentences), Gemini
[learned to translate](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf)
from English to Kalamang---a Papuan language with
fewer than 200 speakers---with quality similar to a human learner using the same
materials. This illustrates the paradigm shift enabled by Gemini's long context,
empowering new possibilities through robust in-context learning.

## Long context use cases

While the standard use case for most generative models is still text input, the
Gemini model family enables a new paradigm of multimodal use cases. These
models can natively understand text, video, audio, and images. They are
accompanied by the [Gemini API that takes in multimodal file
types](https://ai.google.dev/gemini-api/docs/prompting_with_media) for
convenience.

### Long form text

Text has proved to be the layer of intelligence underpinning much of the
momentum around LLMs. As mentioned earlier, much of the practical limitation of
LLMs was because of not having a large enough context window to do certain
tasks. This led to the rapid adoption of retrieval augmented generation (RAG)
and other techniques which dynamically provide the model with relevant
contextual information. Now, with larger and larger context windows, there are
new techniques becoming available which unlock new use cases.

Some emerging and standard use cases for text based long context include:

- Summarizing large corpuses of text
  - Previous summarization options with smaller context models would require a sliding window or another technique to keep state of previous sections as new tokens are passed to the model
- Question and answering
  - Historically this was only possible with RAG given the limited amount of context and models' factual recall being low
- Agentic workflows
  - Text is the underpinning of how agents keep state of what they have done and what they need to do; not having enough information about the world and the agent's goal is a limitation on the reliability of agents

[Many-shot in-context learning](https://arxiv.org/pdf/2404.11018) is one of the
most unique capabilities unlocked by long context models. Research has shown
that taking the common "single shot" or "multi-shot" example paradigm, where the
model is presented with one or a few examples of a task, and scaling that up to
hundreds, thousands, or even hundreds of thousands of examples, can lead to
novel model capabilities. This many-shot approach has also been shown to perform
similarly to models which were fine-tuned for a specific task. For use cases
where a Gemini model's performance is not yet sufficient for a production
rollout, you can try the many-shot approach. As you might explore later in the
long context optimization section, context caching makes this type of high input
token workload much more economically feasible and even lower latency in some
cases.

### Long form video

Video content's utility has long been constrained by the lack of accessibility
of the medium itself. It was hard to skim the content, transcripts often failed
to capture the nuance of a video, and most tools don't process image, text, and
audio together. With Gemini, the long-context text capabilities translate to
the ability to reason and answer questions about multimodal inputs with
sustained performance.

Some emerging and standard use cases for video long context include:

- Video question and answering
- Video memory, as shown with [Google's Project Astra](https://deepmind.google/technologies/gemini/project-astra/)
- Video captioning
- Video recommendation systems, by enriching existing metadata with new multimodal understanding
- Video customization, by looking at a corpus of data and associated video metadata and then removing parts of videos that are not relevant to the viewer
- Video content moderation
- Real-time video processing

When working with videos, it is important to consider how the [videos are
processed into tokens](https://ai.google.dev/gemini-api/docs/tokens#media-token), which affects
billing and usage limits. You can learn more about prompting with video files in
the [Prompting
guide](https://ai.google.dev/gemini-api/docs/prompting_with_media?lang=python#prompting-with-videos).

### Long form audio

The Gemini models were the first natively multimodal large language models
that could understand audio. Historically, the typical developer workflow would
involve stringing together multiple domain specific models, like a
speech-to-text model and a text-to-text model, in order to process audio. This
led to additional latency required by performing multiple round-trip requests
and decreased performance usually attributed to disconnected architectures of
the multiple model setup.

Some emerging and standard use cases for audio context include:

- Real-time transcription and translation
- Podcast / video question and answering
- Meeting transcription and summarization
- Voice assistants

You can learn more about prompting with audio files in the [Prompting
guide](https://ai.google.dev/gemini-api/docs/prompting_with_media?lang=python#prompting-with-videos).

## Long context optimizations

The primary optimization when working with long context and the Gemini
models is to use [context
caching](https://ai.google.dev/gemini-api/docs/caching). Beyond the previous
impossibility of processing lots of tokens in a single request, the other main
constraint was the cost. If you have a "chat with your data" app where a user
uploads 10 PDFs, a video, and some work documents, you would historically have
to work with a more complex retrieval augmented generation (RAG) tool /
framework in order to process these requests and pay a significant amount for
tokens moved into the context window. Now, you can cache the files the user
uploads and pay to store them on a per hour basis. The input / output cost per
request with Gemini Flash for example is \~4x less than the standard
input / output cost, so if
the user chats with their data enough, it becomes a huge cost saving for you as
the developer.

## Long context limitations

In various sections of this guide, we talked about how Gemini models achieve
high performance across various needle-in-a-haystack retrieval evals. These
tests consider the most basic setup, where you have a single needle you are
looking for. In cases where you might have multiple "needles" or specific pieces
of information you are looking for, the model does not perform with the same
accuracy. Performance can vary to a wide degree depending on the context. This
is important to consider as there is an inherent tradeoff between getting the
right information retrieved and cost. You can get \~99% on a single query, but
you have to pay the input token cost every time you send that query. So for 100
pieces of information to be retrieved, if you needed 99% performance, you would
likely need to send 100 requests. This is a good example of where context
caching can significantly reduce the cost associated with using Gemini models
while keeping the performance high.

## FAQs

### Where is the best place to put my query in the context window?

In most cases, especially if the total context is long, the model's
performance will be better if you put your query / question at the end of the
prompt (after all the other context).

### Do I lose model performance when I add more tokens to a query?

Generally, if you don't need tokens to be passed to the model, it is best to
avoid passing them. However, if you have a large chunk of tokens with some
information and want to ask questions about that information, the model is
highly capable of extracting that information (up to 99% accuracy in many
cases).

### How can I lower my cost with long-context queries?

If you have a similar set of tokens / context that you want to re-use many
times, [context caching](https://ai.google.dev/gemini-api/docs/caching) can help reduce the costs
associated with asking questions about that information.

### Does the context length affect the model latency?

There is some fixed amount of latency in any given request, regardless of the
size, but generally longer queries will have higher latency (time to first
token).

Starting with the Gemini 2.0 release in late 2024, we introduced a new set of
libraries called the [Google GenAI SDK](https://ai.google.dev/gemini-api/docs/libraries). It offers
an improved developer experience through
an [updated client architecture](https://ai.google.dev/gemini-api/docs/migrate#client), and
[simplifies the transition](https://ai.google.dev/gemini-api/docs/migrate-to-cloud) between developer
and enterprise workflows.

The Google GenAI SDK is now in [General Availability (GA)](https://ai.google.dev/gemini-api/docs/libraries#new-libraries) across all supported
platforms. If you're using one of our [legacy libraries](https://ai.google.dev/gemini-api/docs/libraries#previous-sdks), we strongly recommend you to
migrate.

This guide provides before-and-after examples of migrated code to help you get
started.
| **Note:** The Go examples omit imports and other boilerplate code to improve readability.

## Installation

**Before**  

### Python

    pip install -U -q "google-generativeai"

### JavaScript

    npm install @google/generative-ai

### Go

    go get github.com/google/generative-ai-go

**After**  

### Python

    pip install -U -q "google-genai"

### JavaScript

    npm install @google/genai

### Go

    go get google.golang.org/genai

## API access

The old SDK implicitly handled the API client behind the scenes using a variety
of ad hoc methods. This made it hard to manage the client and credentials.
Now, you interact through a central `Client` object. This `Client` object acts
as a single entry point for various API services (e.g., `models`, `chats`,
`files`, `tunings`), promoting consistency and simplifying credential and
configuration management across different API calls.

**Before (Less Centralized API Access)**  

### Python

The old SDK didn't explicitly use a top-level client object for most API
calls. You would directly instantiate and interact with `GenerativeModel`
objects.  

    import google.generativeai as genai

    # Directly create and use model objects
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(...)
    chat = model.start_chat(...)

### JavaScript

While `GoogleGenerativeAI` was a central point for models and chat, other
functionalities like file and cache management often required importing and
instantiating entirely separate client classes.  

    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { GoogleAIFileManager, GoogleAICacheManager } from "@google/generative-ai/server"; // For files/caching

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const fileManager = new GoogleAIFileManager("GEMINI_API_KEY");
    const cacheManager = new GoogleAICacheManager("GEMINI_API_KEY");

    // Get a model instance, then call methods on it
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(...);
    const chat = model.startChat(...);

    // Call methods on separate client objects for other services
    const uploadedFile = await fileManager.uploadFile(...);
    const cache = await cacheManager.create(...);

### Go

The `genai.NewClient` function created a client, but generative model
operations were typically called on a separate `GenerativeModel` instance
obtained from this client. Other services might have been accessed via
distinct packages or patterns.  

    import (
          "github.com/google/generative-ai-go/genai"
          "github.com/google/generative-ai-go/genai/fileman" // For files
          "google.golang.org/api/option"
    )

    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    fileClient, err := fileman.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))

    // Get a model instance, then call methods on it
    model := client.GenerativeModel("gemini-2.0-flash")
    resp, err := model.GenerateContent(...)
    cs := model.StartChat()

    // Call methods on separate client objects for other services
    uploadedFile, err := fileClient.UploadFile(...)

**After (Centralized Client Object)**  

### Python

    from google import genai

    # Create a single client object
    client = genai.Client()

    # Access API methods through services on the client object
    response = client.models.generate_content(...)
    chat = client.chats.create(...)
    my_file = client.files.upload(...)
    tuning_job = client.tunings.tune(...)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    // Create a single client object
    const ai = new GoogleGenAI({apiKey: "GEMINI_API_KEY"});

    // Access API methods through services on the client object
    const response = await ai.models.generateContent(...);
    const chat = ai.chats.create(...);
    const uploadedFile = await ai.files.upload(...);
    const cache = await ai.caches.create(...);

### Go

    import "google.golang.org/genai"

    // Create a single client object
    client, err := genai.NewClient(ctx, nil)

    // Access API methods through services on the client object
    result, err := client.Models.GenerateContent(...)
    chat, err := client.Chats.Create(...)
    uploadedFile, err := client.Files.Upload(...)
    tuningJob, err := client.Tunings.Tune(...)

## Authentication

Both legacy and new libraries authenticate using API keys. You can
[create](https://aistudio.google.com/app/apikey) your API key in Google AI
Studio.

**Before**  

### Python

The old SDK handled the API client object implicitly.  

    import google.generativeai as genai

    genai.configure(api_key=...)

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

### Go

Import the Google libraries:  

    import (
          "github.com/google/generative-ai-go/genai"
          "google.golang.org/api/option"
    )

Create the client:  

    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))

**After**  

### Python

With Google GenAI SDK, you create an API client first, which is used to call
the API.
The new SDK will pick up your API key from the `GEMINI_API_KEY` environment
variables, if you don't pass one to the client.  

    export GEMINI_API_KEY="YOUR_API_KEY"

    from google import genai

    client = genai.Client() # Set the API key using the GEMINI_API_KEY env var.
                            # Alternatively, you could set the API key explicitly:
                            # client = genai.Client(api_key="YOUR_API_KEY")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({apiKey: "GEMINI_API_KEY"});

### Go

Import the GenAI library:  

    import "google.golang.org/genai"

Create the client:  

    client, err := genai.NewClient(ctx, &genai.ClientConfig{
            Backend:  genai.BackendGeminiAPI,
    })

## Generate content

### Text

**Before**  

### Python

Previously, there were no client objects, you accessed APIs directly through
`GenerativeModel` objects.  

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(
        'Tell me a story in 300 words'
    )
    print(response.text)

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = "Tell me a story in 300 words";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    model := client.GenerativeModel("gemini-2.0-flash")
    resp, err := model.GenerateContent(ctx, genai.Text("Tell me a story in 300 words."))
    if err != nil {
        log.Fatal(err)
    }

    printResponse(resp) // utility for printing response parts

**After**  

### Python

The new Google GenAI SDK provides access to all the API methods through the
`Client` object. Except for a few stateful special cases (`chat` and
live-api `session`s), these are all stateless functions. For utility and
uniformity, objects returned are `pydantic` classes.  

    from google import genai
    client = genai.Client()

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='Tell me a story in 300 words.'
    )
    print(response.text)

    print(response.model_dump_json(
        exclude_none=True, indent=4))

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Tell me a story in 300 words.",
    });
    console.log(response.text);

### Go

    ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    result, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", genai.Text("Tell me a story in 300 words."), nil)
    if err != nil {
        log.Fatal(err)
    }
    debugPrint(result) // utility for printing result

### Image

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content([
        'Tell me a story based on this image',
        Image.open(image_path)
    ])
    print(response.text)

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    function fileToGenerativePart(path, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType,
        },
      };
    }

    const prompt = "Tell me a story based on this image";

    const imagePart = fileToGenerativePart(
      `path/to/organ.jpg`,
      "image/jpeg",
    );

    const result = await model.generateContent([prompt, imagePart]);
    console.log(result.response.text());

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    model := client.GenerativeModel("gemini-2.0-flash")

    imgData, err := os.ReadFile("path/to/organ.jpg")
    if err != nil {
        log.Fatal(err)
    }

    resp, err := model.GenerateContent(ctx,
        genai.Text("Tell me about this instrument"),
        genai.ImageData("jpeg", imgData))
    if err != nil {
        log.Fatal(err)
    }

    printResponse(resp) // utility for printing response

**After**  

### Python

Many of the same convenience features exist in the new SDK. For
example, `PIL.Image` objects are automatically converted.  

    from google import genai
    from PIL import Image

    client = genai.Client()

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[
            'Tell me a story based on this image',
            Image.open(image_path)
        ]
    )
    print(response.text)

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

    const organ = await ai.files.upload({
      file: "path/to/organ.jpg",
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Tell me a story based on this image",
          createPartFromUri(organ.uri, organ.mimeType)
        ]),
      ],
    });
    console.log(response.text);

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    imgData, err := os.ReadFile("path/to/organ.jpg")
    if err != nil {
        log.Fatal(err)
    }

    parts := []*genai.Part{
        {Text: "Tell me a story based on this image"},
        {InlineData: &genai.Blob{Data: imgData, MIMEType: "image/jpeg"}},
    }
    contents := []*genai.Content{
        {Parts: parts},
    }

    result, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
        log.Fatal(err)
    }
    debugPrint(result) // utility for printing result

### Streaming

**Before**  

### Python

    import google.generativeai as genai

    response = model.generate_content(
        "Write a cute story about cats.",
        stream=True)
    for chunk in response:
        print(chunk.text)

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    model := client.GenerativeModel("gemini-2.0-flash")
    iter := model.GenerateContentStream(ctx, genai.Text("Write a story about a magic backpack."))
    for {
        resp, err := iter.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            log.Fatal(err)
        }
        printResponse(resp) // utility for printing the response
    }

**After**  

### Python

    from google import genai

    client = genai.Client()

    for chunk in client.models.generate_content_stream(
      model='gemini-2.0-flash',
      contents='Tell me a story in 300 words.'
    ):
        print(chunk.text)

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: "Write a story about a magic backpack.",
    });
    let text = "";
    for await (const chunk of response) {
      console.log(chunk.text);
      text += chunk.text;
    }

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    for result, err := range client.Models.GenerateContentStream(
        ctx,
        "gemini-2.0-flash",
        genai.Text("Write a story about a magic backpack."),
        nil,
    ) {
        if err != nil {
            log.Fatal(err)
        }
        fmt.Print(result.Candidates[0].Content.Parts[0].Text)
    }

## Configuration

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel(
      'gemini-2.0-flash',
        system_instruction='you are a story teller for kids under 5 years old',
        generation_config=genai.GenerationConfig(
          max_output_tokens=400,
          top_k=2,
          top_p=0.5,
          temperature=0.5,
          response_mime_type='application/json',
          stop_sequences=['\n'],
        )
    )
    response = model.generate_content('tell me a story in 100 words')

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 20,
        temperature: 1.0,
      },
    });

    const result = await model.generateContent(
      "Tell me a story about a magic backpack.",
    );
    console.log(result.response.text())

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    model := client.GenerativeModel("gemini-2.0-flash")
    model.SetTemperature(0.5)
    model.SetTopP(0.5)
    model.SetTopK(2.0)
    model.SetMaxOutputTokens(100)
    model.ResponseMIMEType = "application/json"
    resp, err := model.GenerateContent(ctx, genai.Text("Tell me about New York"))
    if err != nil {
        log.Fatal(err)
    }
    printResponse(resp) // utility for printing response

**After**  

### Python

For all methods in the new SDK, the required arguments are provided as
keyword arguments. All optional inputs are provided in the `config`
argument. Config arguments can be specified as either Python dictionaries or
`Config` classes in the `google.genai.types` namespace. For utility and
uniformity, all definitions within the `types` module are `pydantic`
classes.  

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
      model='gemini-2.0-flash',
      contents='Tell me a story in 100 words.',
      config=types.GenerateContentConfig(
          system_instruction='you are a story teller for kids under 5 years old',
          max_output_tokens= 400,
          top_k= 2,
          top_p= 0.5,
          temperature= 0.5,
          response_mime_type= 'application/json',
          stop_sequences= ['\n'],
          seed=42,
      ),
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Tell me a story about a magic backpack.",
      config: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 20,
        temperature: 1.0,
      },
    });

    console.log(response.text);

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    result, err := client.Models.GenerateContent(ctx,
        "gemini-2.0-flash",
        genai.Text("Tell me about New York"),
        &genai.GenerateContentConfig{
            Temperature:      genai.Ptr[float32](0.5),
            TopP:             genai.Ptr[float32](0.5),
            TopK:             genai.Ptr[float32](2.0),
            ResponseMIMEType: "application/json",
            StopSequences:    []string{"Yankees"},
            CandidateCount:   2,
            Seed:             genai.Ptr[int32](42),
            MaxOutputTokens:  128,
            PresencePenalty:  genai.Ptr[float32](0.5),
            FrequencyPenalty: genai.Ptr[float32](0.5),
        },
    )
    if err != nil {
        log.Fatal(err)
    }
    debugPrint(result) // utility for printing response

## Safety settings

Generate a response with safety settings:

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(
        'say something bad',
        safety_settings={
            'HATE': 'BLOCK_ONLY_HIGH',
            'HARASSMENT': 'BLOCK_ONLY_HIGH',
      }
    )

### JavaScript

    import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });

    const unsafePrompt =
      "I support Martians Soccer Club and I think " +
      "Jupiterians Football Club sucks! Write an ironic phrase telling " +
      "them how I feel about them.";

    const result = await model.generateContent(unsafePrompt);

    try {
      result.response.text();
    } catch (e) {
      console.error(e);
      console.log(result.response.candidates[0].safetyRatings);
    }

**After**  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
      model='gemini-2.0-flash',
      contents='say something bad',
      config=types.GenerateContentConfig(
          safety_settings= [
              types.SafetySetting(
                  category='HARM_CATEGORY_HATE_SPEECH',
                  threshold='BLOCK_ONLY_HIGH'
              ),
          ]
      ),
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const unsafePrompt =
      "I support Martians Soccer Club and I think " +
      "Jupiterians Football Club sucks! Write an ironic phrase telling " +
      "them how I feel about them.";

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: unsafePrompt,
      config: {
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
      },
    });

    console.log("Finish reason:", response.candidates[0].finishReason);
    console.log("Safety ratings:", response.candidates[0].safetyRatings);

## Async

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content_async(
        'tell me a story in 100 words'
    )

**After**  

### Python

To use the new SDK with `asyncio`, there is a separate `async`
implementation of every method under `client.aio`.  

    from google import genai

    client = genai.Client()

    response = await client.aio.models.generate_content(
        model='gemini-2.0-flash',
        contents='Tell me a story in 300 words.'
    )

## Chat

Start a chat and send a message to the model:

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    chat = model.start_chat()

    response = chat.send_message(
        "Tell me a story in 100 words")
    response = chat.send_message(
        "What happened after that?")

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
    let result = await chat.sendMessage("I have 2 dogs in my house.");
    console.log(result.response.text());
    result = await chat.sendMessage("How many paws are in my house?");
    console.log(result.response.text());

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey("GEMINI_API_KEY"))
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    model := client.GenerativeModel("gemini-2.0-flash")
    cs := model.StartChat()

    cs.History = []*genai.Content{
        {
            Parts: []genai.Part{
                genai.Text("Hello, I have 2 dogs in my house."),
            },
            Role: "user",
        },
        {
            Parts: []genai.Part{
                genai.Text("Great to meet you. What would you like to know?"),
            },
            Role: "model",
        },
    }

    res, err := cs.SendMessage(ctx, genai.Text("How many paws are in my house?"))
    if err != nil {
        log.Fatal(err)
    }
    printResponse(res) // utility for printing the response

**After**  

### Python

    from google import genai

    client = genai.Client()

    chat = client.chats.create(model='gemini-2.0-flash')

    response = chat.send_message(
        message='Tell me a story in 100 words')
    response = chat.send_message(
        message='What happened after that?')

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    const response1 = await chat.sendMessage({
      message: "I have 2 dogs in my house.",
    });
    console.log("Chat response 1:", response1.text);

    const response2 = await chat.sendMessage({
      message: "How many paws are in my house?",
    });
    console.log("Chat response 2:", response2.text);

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    chat, err := client.Chats.Create(ctx, "gemini-2.0-flash", nil, nil)
    if err != nil {
        log.Fatal(err)
    }

    result, err := chat.SendMessage(ctx, genai.Part{Text: "Hello, I have 2 dogs in my house."})
    if err != nil {
        log.Fatal(err)
    }
    debugPrint(result) // utility for printing result

    result, err = chat.SendMessage(ctx, genai.Part{Text: "How many paws are in my house?"})
    if err != nil {
        log.Fatal(err)
    }
    debugPrint(result) // utility for printing result

## Function calling

**Before**  

### Python

    import google.generativeai as genai
    from enum import Enum

    def get_current_weather(location: str) -> str:
        """Get the current whether in a given location.

        Args:
            location: required, The city and state, e.g. San Franciso, CA
            unit: celsius or fahrenheit
        """
        print(f'Called with: {location=}')
        return "23C"

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        tools=[get_current_weather]
    )

    response = model.generate_content("What is the weather in San Francisco?")
    function_call = response.candidates[0].parts[0].function_call

**After**  

### Python

In the new SDK, automatic function calling is the default. Here, you disable
it.  

    from google import genai
    from google.genai import types

    client = genai.Client()

    def get_current_weather(location: str) -> str:
        """Get the current whether in a given location.

        Args:
            location: required, The city and state, e.g. San Franciso, CA
            unit: celsius or fahrenheit
        """
        print(f'Called with: {location=}')
        return "23C"

    response = client.models.generate_content(
      model='gemini-2.0-flash',
      contents="What is the weather like in Boston?",
      config=types.GenerateContentConfig(
          tools=[get_current_weather],
          automatic_function_calling={'disable': True},
      ),
    )

    function_call = response.candidates[0].content.parts[0].function_call

### Automatic function calling

**Before**  

### Python

The old SDK only supports automatic function calling in chat. In the new SDK
this is the default behavior in `generate_content`.  

    import google.generativeai as genai

    def get_current_weather(city: str) -> str:
        return "23C"

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        tools=[get_current_weather]
    )

    chat = model.start_chat(
        enable_automatic_function_calling=True)
    result = chat.send_message("What is the weather in San Francisco?")

**After**  

### Python

    from google import genai
    from google.genai import types
    client = genai.Client()

    def get_current_weather(city: str) -> str:
        return "23C"

    response = client.models.generate_content(
      model='gemini-2.0-flash',
      contents="What is the weather like in Boston?",
      config=types.GenerateContentConfig(
          tools=[get_current_weather]
      ),
    )

## Code execution

Code execution is a tool that allows the model to generate Python code, run it,
and return the result.

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        tools="code_execution"
    )

    result = model.generate_content(
      "What is the sum of the first 50 prime numbers? Generate and run code for "
      "the calculation, and make sure you get all 50.")

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      tools: [{ codeExecution: {} }],
    });

    const result = await model.generateContent(
      "What is the sum of the first 50 prime numbers? " +
        "Generate and run code for the calculation, and make sure you get " +
        "all 50.",
    );

    console.log(result.response.text());

**After**  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='What is the sum of the first 50 prime numbers? Generate and run '
                'code for the calculation, and make sure you get all 50.',
        config=types.GenerateContentConfig(
            tools=[types.Tool(code_execution=types.ToolCodeExecution)],
        ),
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Write and execute code that calculates the sum of the first 50 prime numbers.
                Ensure that only the executable code and its resulting output are generated.`,
    });

    // Each part may contain text, executable code, or an execution result.
    for (const part of response.candidates[0].content.parts) {
      console.log(part);
      console.log("\n");
    }

    console.log("-".repeat(80));
    // The `.text` accessor concatenates the parts into a markdown-formatted text.
    console.log("\n", response.text);

## Search grounding

`GoogleSearch` (Gemini\>=2.0) and `GoogleSearchRetrieval` (Gemini \< 2.0) are
tools that allow the model to retrieve public web data for grounding, powered by
Google.

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(
        contents="what is the Google stock price?",
        tools='google_search_retrieval'
    )

**After**  

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='What is the Google stock price?',
        config=types.GenerateContentConfig(
            tools=[
                types.Tool(
                    google_search=types.GoogleSearch()
                )
            ]
        )
    )

## JSON response

Generate answers in JSON format.

**Before**  

### Python

By specifying a `response_schema` and setting
`response_mime_type="application/json"` users can constrain the model to
produce a `JSON` response following a given structure.  

    import google.generativeai as genai
    import typing_extensions as typing

    class CountryInfo(typing.TypedDict):
        name: str
        population: int
        capital: str
        continent: str
        major_cities: list[str]
        gdp: int
        official_language: str
        total_area_sq_mi: int

    model = genai.GenerativeModel(model_name="gemini-2.0-flash")
    result = model.generate_content(
        "Give me information of the United States",
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema = CountryInfo
        ),
    )

### JavaScript

    import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

    const schema = {
      description: "List of recipes",
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          recipeName: {
            type: SchemaType.STRING,
            description: "Name of the recipe",
            nullable: false,
          },
        },
        required: ["recipeName"],
      },
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      "List a few popular cookie recipes.",
    );
    console.log(result.response.text());

**After**  

### Python

The new SDK uses
`pydantic` classes to provide the schema (although you can pass a
`genai.types.Schema`, or equivalent `dict`). When possible, the SDK will
parse the returned JSON, and return the result in `response.parsed`. If you
provided a `pydantic` class as the schema the SDK will convert that `JSON`
to an instance of the class.  

    from google import genai
    from pydantic import BaseModel

    client = genai.Client()

    class CountryInfo(BaseModel):
        name: str
        population: int
        capital: str
        continent: str
        major_cities: list[str]
        gdp: int
        official_language: str
        total_area_sq_mi: int

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='Give me information of the United States.',
        config={
            'response_mime_type': 'application/json',
            'response_schema': CountryInfo,
        },
    )

    response.parsed

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "List a few popular cookie recipes.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              recipeName: { type: "string" },
              ingredients: { type: "array", items: { type: "string" } },
            },
            required: ["recipeName", "ingredients"],
          },
        },
      },
    });
    console.log(response.text);

## Files

### Upload

Upload a file:

**Before**  

### Python

    import requests
    import pathlib
    import google.generativeai as genai

    # Download file
    response = requests.get(
        'https://storage.googleapis.com/generativeai-downloads/data/a11.txt')
    pathlib.Path('a11.txt').write_text(response.text)

    file = genai.upload_file(path='a11.txt')

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content([
        'Can you summarize this file:',
        my_file
    ])
    print(response.text)

**After**  

### Python

    import requests
    import pathlib
    from google import genai

    client = genai.Client()

    # Download file
    response = requests.get(
        'https://storage.googleapis.com/generativeai-downloads/data/a11.txt')
    pathlib.Path('a11.txt').write_text(response.text)

    my_file = client.files.upload(file='a11.txt')

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[
            'Can you summarize this file:',
            my_file
        ]
    )
    print(response.text)

### List and get

List uploaded files and get an uploaded file with a filename:

**Before**  

### Python

    import google.generativeai as genai

    for file in genai.list_files():
      print(file.name)

    file = genai.get_file(name=file.name)

**After**  

### Python

    from google import genai
    client = genai.Client()

    for file in client.files.list():
        print(file.name)

    file = client.files.get(name=file.name)

### Delete

Delete a file:

**Before**  

### Python

    import pathlib
    import google.generativeai as genai

    pathlib.Path('dummy.txt').write_text(dummy)
    dummy_file = genai.upload_file(path='dummy.txt')

    file = genai.delete_file(name=dummy_file.name)

**After**  

### Python

    import pathlib
    from google import genai

    client = genai.Client()

    pathlib.Path('dummy.txt').write_text(dummy)
    dummy_file = client.files.upload(file='dummy.txt')

    response = client.files.delete(name=dummy_file.name)

## Context caching

Context caching allows the user to pass the content to the model once, cache the
input tokens, and then refer to the cached tokens in subsequent calls to lower
the cost.

**Before**  

### Python

    import requests
    import pathlib
    import google.generativeai as genai
    from google.generativeai import caching

    # Download file
    response = requests.get(
        'https://storage.googleapis.com/generativeai-downloads/data/a11.txt')
    pathlib.Path('a11.txt').write_text(response.text)

    # Upload file
    document = genai.upload_file(path="a11.txt")

    # Create cache
    apollo_cache = caching.CachedContent.create(
        model="gemini-2.0-flash-001",
        system_instruction="You are an expert at analyzing transcripts.",
        contents=[document],
    )

    # Generate response
    apollo_model = genai.GenerativeModel.from_cached_content(
        cached_content=apollo_cache
    )
    response = apollo_model.generate_content("Find a lighthearted moment from this transcript")

### JavaScript

    import { GoogleAICacheManager, GoogleAIFileManager } from "@google/generative-ai/server";
    import { GoogleGenerativeAI } from "@google/generative-ai";

    const cacheManager = new GoogleAICacheManager("GEMINI_API_KEY");
    const fileManager = new GoogleAIFileManager("GEMINI_API_KEY");

    const uploadResult = await fileManager.uploadFile("path/to/a11.txt", {
      mimeType: "text/plain",
    });

    const cacheResult = await cacheManager.create({
      model: "models/gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
              },
            },
          ],
        },
      ],
    });

    console.log(cacheResult);

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModelFromCachedContent(cacheResult);
    const result = await model.generateContent(
      "Please summarize this transcript.",
    );
    console.log(result.response.text());

**After**  

### Python

    import requests
    import pathlib
    from google import genai
    from google.genai import types

    client = genai.Client()

    # Check which models support caching.
    for m in client.models.list():
      for action in m.supported_actions:
        if action == "createCachedContent":
          print(m.name)
          break

    # Download file
    response = requests.get(
        'https://storage.googleapis.com/generativeai-downloads/data/a11.txt')
    pathlib.Path('a11.txt').write_text(response.text)

    # Upload file
    document = client.files.upload(file='a11.txt')

    # Create cache
    model='gemini-2.0-flash-001'
    apollo_cache = client.caches.create(
          model=model,
          config={
              'contents': [document],
              'system_instruction': 'You are an expert at analyzing transcripts.',
          },
      )

    # Generate response
    response = client.models.generate_content(
        model=model,
        contents='Find a lighthearted moment from this transcript',
        config=types.GenerateContentConfig(
            cached_content=apollo_cache.name,
        )
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const filePath = path.join(media, "a11.txt");
    const document = await ai.files.upload({
      file: filePath,
      config: { mimeType: "text/plain" },
    });
    console.log("Uploaded file name:", document.name);
    const modelName = "gemini-2.0-flash";

    const contents = [
      createUserContent(createPartFromUri(document.uri, document.mimeType)),
    ];

    const cache = await ai.caches.create({
      model: modelName,
      config: {
        contents: contents,
        systemInstruction: "You are an expert analyzing transcripts.",
      },
    });
    console.log("Cache created:", cache);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: "Please summarize this transcript",
      config: { cachedContent: cache.name },
    });
    console.log("Response text:", response.text);

## Count tokens

Count the number of tokens in a request.

**Before**  

### Python

    import google.generativeai as genai

    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.count_tokens(
        'The quick brown fox jumps over the lazy dog.')

### JavaScript

     import { GoogleGenerativeAI } from "@google/generative-ai";

     const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
     const model = genAI.getGenerativeModel({
       model: "gemini-2.0-flash",
     });

     // Count tokens in a prompt without calling text generation.
     const countResult = await model.countTokens(
       "The quick brown fox jumps over the lazy dog.",
     );

     console.log(countResult.totalTokens); // 11

     const generateResult = await model.generateContent(
       "The quick brown fox jumps over the lazy dog.",
     );

     // On the response for `generateContent`, use `usageMetadata`
     // to get separate input and output token counts
     // (`promptTokenCount` and `candidatesTokenCount`, respectively),
     // as well as the combined token count (`totalTokenCount`).
     console.log(generateResult.response.usageMetadata);
     // candidatesTokenCount and totalTokenCount depend on response, may vary
     // { promptTokenCount: 11, candidatesTokenCount: 124, totalTokenCount: 135 }

**After**  

### Python

    from google import genai

    client = genai.Client()

    response = client.models.count_tokens(
        model='gemini-2.0-flash',
        contents='The quick brown fox jumps over the lazy dog.',
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const prompt = "The quick brown fox jumps over the lazy dog.";
    const countTokensResponse = await ai.models.countTokens({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(countTokensResponse.totalTokens);

    const generateResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(generateResponse.usageMetadata);

## Generate images

Generate images:

**Before**  

### Python

    #pip install https://github.com/google-gemini/generative-ai-python@imagen
    import google.generativeai as genai

    imagen = genai.ImageGenerationModel(
        "imagen-3.0-generate-001")
    gen_images = imagen.generate_images(
        prompt="Robot holding a red skateboard",
        number_of_images=1,
        safety_filter_level="block_low_and_above",
        person_generation="allow_adult",
        aspect_ratio="3:4",
    )

**After**  

### Python

    from google import genai

    client = genai.Client()

    gen_images = client.models.generate_images(
        model='gemini-2.5-flash-image',
        prompt='Robot holding a red skateboard',
        config=types.GenerateImagesConfig(
            number_of_images= 1,
            safety_filter_level= "BLOCK_LOW_AND_ABOVE",
            person_generation= "ALLOW_ADULT",
            aspect_ratio= "3:4",
        )
    )

    for n, image in enumerate(gen_images.generated_images):
        pathlib.Path(f'{n}.png').write_bytes(
            image.image.image_bytes)

## Embed content

Generate content embeddings.

**Before**  

### Python

    import google.generativeai as genai

    response = genai.embed_content(
      model='models/gemini-embedding-001',
      content='Hello world'
    )

### JavaScript

    import { GoogleGenerativeAI } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({
      model: "gemini-embedding-001",
    });

    const result = await model.embedContent("Hello world!");

    console.log(result.embedding);

**After**  

### Python

    from google import genai

    client = genai.Client()

    response = client.models.embed_content(
      model='gemini-embedding-001',
      contents='Hello world',
    )

### JavaScript

    import {GoogleGenAI} from '@google/genai';

    const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });
    const text = "Hello World!";
    const result = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      config: { outputDimensionality: 10 },
    });
    console.log(result.embeddings);

Use this guide to help you diagnose and resolve common issues that arise when
you call the Gemini API. You may encounter issues from either
the Gemini API backend service or the client SDKs. Our client SDKs are
open sourced in the following repositories:

- [python-genai](https://github.com/googleapis/python-genai)
- [js-genai](https://github.com/googleapis/js-genai)
- [go-genai](https://github.com/googleapis/go-genai)

If you encounter API key issues, verify that you have set up
your API key correctly per the [API key setup guide](https://ai.google.dev/gemini-api/docs/api-key).

## Gemini API backend service error codes

The following table lists common backend error codes you may encounter, along
with explanations for their causes and troubleshooting steps:

|---|---|---|---|---|
| **HTTP Code** | **Status** | **Description** | **Example** | **Solution** |
| 400 | INVALID_ARGUMENT | The request body is malformed. | There is a typo, or a missing required field in your request. | Check the [API reference](https://ai.google.dev/api) for request format, examples, and supported versions. Using features from a newer API version with an older endpoint can cause errors. |
| 400 | FAILED_PRECONDITION | Gemini API free tier is not available in your country. Please enable billing on your project in Google AI Studio. | You are making a request in a region where the free tier is not supported, and you have not enabled billing on your project in Google AI Studio. | To use the Gemini API, you will need to setup a paid plan using [Google AI Studio](https://aistudio.google.com/app/apikey). |
| 403 | PERMISSION_DENIED | Your API key doesn't have the required permissions. | You are using the wrong API key; you are trying to use a tuned model without going through [proper authentication](https://ai.google.dev/docs/model-tuning/tutorial?lang=python#set_up_authentication). | Check that your API key is set and has the right access. And make sure to go through proper authentication to use tuned models. |
| 404 | NOT_FOUND | The requested resource wasn't found. | An image, audio, or video file referenced in your request was not found. | Check if all [parameters in your request are valid](https://ai.google.dev/docs/troubleshooting#check-api) for your API version. |
| 429 | RESOURCE_EXHAUSTED | You've exceeded the rate limit. | You are sending too many requests per minute with the free tier Gemini API. | Verify that you're within the model's [rate limit](https://ai.google.dev/gemini-api/docs/rate-limits). [Request a quota increase](https://ai.google.dev/gemini-api/docs/rate-limits#request-rate-limit-increase) if needed. |
| 500 | INTERNAL | An unexpected error occurred on Google's side. | Your input context is too long. | Reduce your input context or temporarily switch to another model (e.g. from Gemini 2.5 Pro to Gemini 2.5 Flash) and see if it works. Or wait a bit and retry your request. If the issue persists after retrying, please report it using the **Send feedback** button in Google AI Studio. |
| 503 | UNAVAILABLE | The service may be temporarily overloaded or down. | The service is temporarily running out of capacity. | Temporarily switch to another model (e.g. from Gemini 2.5 Pro to Gemini 2.5 Flash) and see if it works. Or wait a bit and retry your request. If the issue persists after retrying, please report it using the **Send feedback** button in Google AI Studio. |
| 504 | DEADLINE_EXCEEDED | The service is unable to finish processing within the deadline. | Your prompt (or context) is too large to be processed in time. | Set a larger 'timeout' in your client request to avoid this error. |

## Check your API calls for model parameter errors

Verify that your model parameters are within the following values:

|---|---|
| **Model parameter** | **Values (range)** |
| Candidate count | 1-8 (integer) |
| Temperature | 0.0-1.0 |
| Max output tokens | Use `get_model` ([Python](https://ai.google.dev/api/python/google/generativeai/get_model)) to determine the maximum number of tokens for the model you are using. |
| TopP | 0.0-1.0 |

In addition to checking parameter values, make sure you're using the correct
[API version](https://ai.google.dev/gemini-api/docs/api-versions) (e.g., `/v1` or `/v1beta`) and
model that supports the features you need. For example, if a feature is in Beta
release, it will only be available in the `/v1beta` API version.

## Check if you have the right model

Verify that you are using a supported model listed on our [models
page](https://ai.google.dev/gemini-api/docs/models/gemini).

## Higher latency or token usage with 2.5 models

If you're observing higher latency or token usage with the 2.5 Flash and Pro
models, this can be because they come with **thinking is enabled by default** in
order to enhance quality. If you are prioritizing speed or need to minimize
costs, you can adjust or disable thinking.

Refer to [thinking page](https://ai.google.dev/gemini-api/docs/thinking#set-budget) for
guidance and sample code.

## Safety issues

If you see a prompt was blocked because of a safety setting in your API call,
review the prompt with respect to the filters you set in the API call.

If you see `BlockedReason.OTHER`, the query or response may violate the [terms
of service](https://ai.google.dev/terms) or be otherwise unsupported.

## Recitation issue

If you see the model stops generating output due to the RECITATION reason, this
means the model output may resemble certain data. To fix this, try to make
prompt / context as unique as possible and use a higher temperature.
| When using Gemini 3 models, we strongly recommend keeping the `temperature` at its default value of 1.0. Changing the temperature (setting it below 1.0) may lead to unexpected behavior, such as looping or degraded performance, particularly in complex mathematical or reasoning tasks.

## Repetitive tokens issue

If you see repeated output tokens, try the following suggestions to help
reduce or eliminate them.

| Description | Cause | Suggested workaround |
| Repeated hyphens in Markdown tables | This can occur when the contents of the table are long as the model tries to create a visually aligned Markdown table. However, the alignment in Markdown is not necessary for correct rendering. | Add instructions in your prompt to give the model specific guidelines for generating Markdown tables. Provide examples that follow those guidelines. You can also try adjusting the temperature. For generating code or very structured output like Markdown tables, high temperature have shown to work better (\>= 0.8). The following is an example set of guidelines you can add to your prompt to prevent this issue: ``` # Markdown Table Format * Separator line: Markdown tables must include a separator line below the header row. The separator line must use only 3 hyphens per column, for example: |---|---|---|. Using more hypens like ---, ---, --- can result in errors. Always use |:---|, |---:|, or |---| in these separator strings. For example: | Date | Description | Attendees | |---|---|---| | 2024-10-26 | Annual Conference | 500 | | 2025-01-15 | Q1 Planning Session | 25 | * Alignment: Do not align columns. Always use |---|. For three columns, use |---|---|---| as the separator line. For four columns use |---|---|---|---| and so on. * Conciseness: Keep cell content brief and to the point. * Never pad column headers or other cells with lots of spaces to match with width of other content. Only a single space on each side is needed. For example, always do "| column name |" instead of "| column name                |". Extra spaces are wasteful. A markdown renderer will automatically take care displaying the content in a visually appealing form. ``` |
| Repeated tokens in Markdown tables | Similar to the repeated hyphens, this occurs when the model tries to visually align the contents of the table. The alignment in Markdown is not required for correct rendering. | - Try adding instructions like the following to your system prompt: ``` FOR TABLE HEADINGS, IMMEDIATELY ADD ' |' AFTER THE TABLE HEADING. ``` - Try adjusting the temperature. Higher temperatures (\>= 0.8) generally helps to eliminate repetitions or duplication in the output. |
| Repeated newlines (`\n`) in structured output | When the model input contains unicode or escape sequences like `\u` or `\t`, it can lead to repeated newlines. | - Check for and replace forbidden escape sequences with UTF-8 characters in your prompt. For example, `\u` escape sequence in your JSON examples can cause the model to use them in its output too. - Instruct the model on allowed escapes. Add a system instruction like this: ``` In quoted strings, the only allowed escape sequences are \\, \n, and \". Instead of \u escapes, use UTF-8. ``` |
| Repeated text in using structured output | When the model output has a different order for the fields than the defined structured schema, this can lead to repeating text. | - Don't specify the order of fields in your prompt. - Make all output fields required. |
| Repetitive tool calling | This can occur if the model loses the context of previous thoughts and/or call an unavailable endpoint that it's forced to. | Instruct the model to maintain state within its thought process. Add this to the end of your system instructions: ``` When thinking silently: ALWAYS start the thought with a brief (one sentence) recap of the current progress on the task. In particular, consider whether the task is already done. ``` |
| Repetitive text that's not part of structured output | This can occur if the model gets stuck on a request that it can't resolve. | - If thinking is turned on, avoid giving explicit orders for how to think through a problem in the instructions. Just ask for the final output. - Try a higher temperature \>= 0.8. - Add instructions like "Be concise", "Don't repeat yourself", or "Provide the answer once". |
|---|---|---|

## Blocked or non-working API keys

This section describes how to check whether your Gemini API key is blocked
and what to do about it.

### Understand why keys are blocked

We have identified a vulnerability where some API keys may have been publicly
exposed. To protect your data and prevent unauthorized access, we have
proactively blocked these known leaked keys from accessing the Gemini API.

### Confirm if your keys are affected

If your key is known to be leaked, you can no longer use that key with the
Gemini API. You can use [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-keys) to see if any of
your API keys are blocked from calling the Gemini API and generate new
keys. You may also see the following error returned when attempting to use
these keys:

    Your API key was reported as leaked. Please use another API key.

### Action for blocked API keys

You should generate new API keys for your Gemini API integrations using [Google
AI Studio](https://ai.google.dev/gemini-api/docs/api-keys). We strongly recommend reviewing your API
key management practices to ensure that your new keys are kept secure and are
not publicly exposed.

### Unexpected charges due to vulnerability

[Submit a billing support case](https://console.cloud.google.com/support/chat).
Our billing team is working on this, and we will communicate updates as soon as
possible.

### Google's security measures for leaked keys

**How is Google going to help secure my account from cost overrun and abuse if
my API keys are leaked?**

- We are moving towards issuing API keys when you request a new key using [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-keys) that will by default be limited to only Google AI Studio and not accept keys from other services. This will help prevent any unintended cross-key usage.
- We are defaulting to blocking API keys that are leaked and used with the Gemini API, helping prevent abuse of cost and your application data.
- You will be able to find the status of your API keys within [Google AI
  Studio](https://ai.google.dev/gemini-api/docs/api-keys) and we will work on communicating proactively when we identify your API keys are leaked for immediate action.

## Improve model output

For higher quality model outputs, explore writing more structured prompts. The
[prompt engineering guide](https://ai.google.dev/gemini-api/docs/prompting-strategies) page
introduces some basic concepts, strategies, and best practices to get you
started.

## Understand token limits

Read through our [Token guide](https://ai.google.dev/gemini-api/docs/tokens) to better understand how
to count tokens and their limits.

## Known issues

- The API supports only a number of select languages. Submitting prompts in unsupported languages can produce unexpected or even blocked responses. See [available languages](https://ai.google.dev/gemini-api/docs/models#supported-languages) for updates.

## File a bug

Join the discussion on the
[Google AI developer forum](https://discuss.ai.google.dev)
if you have questions.