---
title: "Projects"
permalink: /projects/
author_profile: true
---

{% include base_path %}

Here you can find a collection of my recent ML projects, as well as some older side projects and little tools that I have built over the years.

{% for post in site.projects %}
  {% include archive-single.html %}
{% endfor %}

