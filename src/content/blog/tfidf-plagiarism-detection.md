---
title: "Understanding TF-IDF and Cosine Similarity for Plagiarism Detection"
description: "How I built an NLP-based plagiarism detector using TF-IDF vectorization and cosine similarity to detect semantic patterns in academic documents."
pubDate: 2025-10-10
tags: ["Python", "NLP", "Machine Learning", "TF-IDF"]
---

## The Problem

Academic plagiarism isn't always copy-paste. Students often paraphrase content, change word order, or use synonyms. A simple string comparison won't catch these cases—we need **semantic analysis**.

## The Solution: TF-IDF + Cosine Similarity

My approach uses two key NLP techniques:

### 1. TF-IDF (Term Frequency-Inverse Document Frequency)

TF-IDF measures how important a word is to a document relative to a collection of documents (corpus).

**Formula:**
```
TF-IDF(word, doc) = TF(word, doc) × IDF(word)

where:
TF = (# times word appears in doc) / (total words in doc)
IDF = log( total docs / docs containing word )
```

This gives high scores to words that are:
- ✅ **Frequent in the document** (high TF)
- ✅ **Rare across the corpus** (high IDF)

Common words like "the" or "is" get low scores (appear everywhere), while domain-specific terms get high scores (unique to certain documents).

### 2. Cosine Similarity

Once documents are vectorized with TF-IDF, we compare them using **cosine similarity**, which measures the angle between two vectors in high-dimensional space.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Vectorize documents
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(documents)

# Calculate similarity
similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
```

A score of:
- **1.0** = Identical documents
- **0.8-0.99** = Very similar (likely plagiarism)
- **< 0.5** = Different content

## Implementation

The system processes documents in three stages:

### Stage 1: Preprocessing
- Remove stopwords (a, the, is, etc.)
- Lowercase everything
- Tokenize sentences

### Stage 2: Vectorization
```python
vectorizer = TfidfVectorizer(
    max_features=5000,  # Limit to top 5000 terms
    ngram_range=(1, 2),  # Use unigrams and bigrams
    min_df=2  # Ignore terms appearing in < 2 docs
)
```

### Stage 3: Comparison
Compare each document against the corpus and flag pairs exceeding a similarity threshold (e.g., 0.75).

## Handling Edge Cases

### False Positives
- **Shared citations**: Academic papers cite the same sources
- **Solution**: Remove reference sections before analysis

### False Negatives
- **Synonym substitution**: "big" → "large"
- **Solution**: Use word embeddings (Word2Vec) instead of TF-IDF

## Performance

On a test corpus of 100 documents:
- **Accuracy**: 92%
- **Processing time**: ~3 seconds
- **False positives**: 5%

## Limitations

TF-IDF doesn't understand semantics. It sees "The cat sat on the mat" and "The mat had a cat sitting on it" as different, even though they're semantically identical.

**Future improvement**: Use **BERT embeddings** or **sentence transformers** for true semantic similarity.

## Real-World Application

This technique is used by:
- **Turnitin** (plagiarism detection)
- **Google Search** (document ranking)
- **Recommendation systems** (content similarity)

---

The full implementation is available on [GitHub](https://github.com/facur3/plagios). Feel free to experiment with your own documents!
