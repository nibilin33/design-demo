# foundation
纯JS逻辑,UI 行为触发后的各种计算、分支判断等逻辑，它并不直接操作或者引用 DOM，任意需要 DOM 操作，驱动组件渲染更新的部分会委派给 Adapter 执行(会使用框架 API 进行 setState、getState、addEventListener、removeListener 等操作,有多套)                
可以学习[material-components](https://github.com/material-components/material-components-web/tree/master/packages)  

## 一些简单的类型理解和使用      
### Partial 
1. 更新一些字段在已存在的对象中
```js
interface IArticle {
    content: string;
    tags: string[];
    category: string;
}

const update = (article: Partial<IArticle>): void => {
    // update the article here.
};

update({ content: 'new content' });
```
2. 在单测中mock 一些方法
3. 在构造函数中传一些值
```js
class Article {
    public content!: string;
    public tags!: string[];
    public category!: string;

    public constructor(data: Partial<Article>) {
        Object.assign(this, data);
    }
}

const article = new Article({
    content: 'New content'
});
```

### Record      
Record<K, T> 用于简化产生新的类型  
```js
type Status = 'error' | 'success';

const statusImages: Record<Status, string> = {
  error: 'image1.png',
  success: 'image2.png'
};
```      

### Pick        
从interface或者key值里动态的生成类型        
```js
interface IPerson {
    firstName: string;
    lastName: string;
    age: number;
}
type PersonFullName = Pick<IPerson, 'firstName' | 'lastName'>;
const person: PersonFullName = {
    firstName: 'Tim',
    lastName: 'Mousk'
};
```