<p align="center">
  <img src="https://i.imgur.com/QgGR2XG.png" alt="Prompts" width="300" />
</p>

<h1 align="center">WebPizi</h1>

<p align="center">
  <b>Beautiful, user-friendly and izi to use interactive CLI to parse your images into .webp format</b><br />
  <sub>> Current modes: local and aws</sub>
</p>

<br />


![split](https://github.com/terkelg/prompts/raw/master/media/split.png)


## ❯ Install

```
$ npm install -g webpizi
```

![split](https://github.com/terkelg/prompts/raw/master/media/split.png)

## ❯ Usage

```
$ webpizi
```

> Simple as that :)


![split](https://github.com/terkelg/prompts/raw/master/media/split.png)


## ❯ Modes

### **Local**

The local mode means that you want to parse images that are in you machine, once you parse then to webp they will be stored in the same directory but with .webp

#### Deep option

Once you accept this option, this mean that any folder inside the directory you wanna parse webpizi will look for and parse images as well.

#### Example with deep option

<img src="https://i.imgur.com/iD6qZOj.png" alt="example" width="300" />

```
├── images
│   ├── moreImages
│   │   ├── cat.png
│   ├── dog.png
│   ├── foo.png
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   │   ├── pig.png
│   │   ├── lion.png
│   ├── js
│   ├── index.html
```

Will turn into something like this:

```
├── images
│   ├── moreImages
│   │   ├── cat.png
│   │   ├── cat.webp
│   ├── dog.png
│   ├── dog.webp
│   ├── foo.png
│   ├── foo.webp
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   │   ├── pig.png
│   │   ├── lion.png
│   ├── js
│   ├── index.html
```

### **AWS (Buckets)**

The AWS mode means that you want to parse images that are in AWS cloud, more precisely on buckets. To start with, select your profile and the region of the bucket you wanna parse, then select which bucket you wanna parse the images. All images inside the bucket will be parsed into .webp format with the same name.

>**Credentials**: To use this feature, make sure that your credentials/profiles are configured! Please take a look at this guide [AWS Credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)

![split](https://github.com/terkelg/prompts/raw/master/media/split.png)


***

## ❯ Credit
This CLI is built on top of [prompts lib](https://github.com/terkelg/prompts).