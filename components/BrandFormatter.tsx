"use client";

import { useEffect } from "react";

const BRAND_TEXT = "QuoteCore+";
const SKIP_SELECTOR = "script, style, noscript, svg, textarea, input, option, .brand-wordmark";

function createBrandWordmark() {
  const wrapper = document.createElement("span");
  wrapper.className = "brand-wordmark";
  wrapper.append("QuoteCore");

  const plus = document.createElement("span");
  plus.className = "brand-plus";
  plus.textContent = "+";
  wrapper.append(plus);

  return wrapper;
}

function formatTextNode(node: Text) {
  const value = node.nodeValue;

  if (!value || !value.includes(BRAND_TEXT)) {
    return;
  }

  const parent = node.parentElement;
  if (!parent || parent.closest(SKIP_SELECTOR)) {
    return;
  }

  const parts = value.split(BRAND_TEXT);
  const fragment = document.createDocumentFragment();

  parts.forEach((part, index) => {
    if (part) {
      fragment.append(document.createTextNode(part));
    }

    if (index < parts.length - 1) {
      fragment.append(createBrandWordmark());
    }
  });

  node.replaceWith(fragment);
}

function formatBrandMentions(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    formatTextNode(root as Text);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
    return;
  }

  const element = root as Element;
  if (element.matches?.(SKIP_SELECTOR)) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach(formatTextNode);
}

export default function BrandFormatter() {
  useEffect(() => {
    formatBrandMentions(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") {
          formatBrandMentions(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(formatBrandMentions);
      });
    });

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
