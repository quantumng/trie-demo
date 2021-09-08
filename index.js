const DICTS = [
    'zhīdào',
    'zhōnghuá',
    'rénmín',
    'gònghéguó',
    'wànsuì',
    'zhōnghuárénmíngònghéguó',
]


class TrieNode {

    constructor(isWord = false) {
        // 标识当前节点是否已构成单词
        this.isWord = isWord;
        // 子节点集， Map数据结构
        // 也可直接使用对象，但相比较用Map更为高效；
        this.child = new Map();
    }
}

class Trie {

    constructor() {
        this.root = new TrieNode();
    }

    add(word) {
        this.addChild(this.root, word, 0);
    }
    
    addChild(node, word, index) {
        // 索引与词长度相等时，标识该节点构成单词
        if (index === word.length) {
            if (!node.isWord) {
                node.isWord = true;
            }
            return;
        }

        const child = node.child;
        const char = word[index];

        //节点上没有该字符的话，生成一个新的节点；
        if (!child.has(char)) {
            child.set(char, new TrieNode());
        }

        // 递归添加节点
        this.addChild(child.get(char), word, index + 1);
    }

    search(word) {
        return this.searchTrie(this.root, word, 0);
    }

    // 查找单词
    searchTrie(node, word, index) {
        // 索引与词长度相等时，检查是与构成单词
        if (index === word.length) {
            return node.isWord;
        }

        const curNode = node.child;
        const char = word[index];

        if (!curNode.has(char)) {
            return false;
        }

        return this.searchTrie(curNode.get(char), word, index + 1);
    }
}

class WordCount {
    constructor() {
        this.dict = new Trie();
        this.addDict(DICTS);
    }

    addDict(dictData) {
        for (let word of dictData) {
            word = word.trim();
            if (word.length > 0) {
                this.dict.add(word);
            }
        }
    }

    tokenize(content) {
        const words = [];
        let index = 0;
        let currentWord = '';
        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            const checkWord = currentWord + char;
            if (this.dict.search(checkWord)) {
                words[index] = checkWord;
                currentWord = '';
                index++;
            } else {
                currentWord = checkWord;
                if (i === content.length - 1) {
                    words[index] = currentWord;
                }
            }
        }

        return words;
    }

    parseText(content) {
        let result = [];
        const contentArray = content.split(' ');

        for (let text of contentArray) {
            const tokens = this.tokenize(text);
            result = result.concat(tokens);
        }
        return result;
    }

}

const wordcount = new WordCount();

const res = wordcount.parseText('zhōnghuárénmíngònghéguó wànsuì');
console.log('res', res);
