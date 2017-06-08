
#学习前端开发文档


##一.前端开发环境搭建

###node.js/npm
#####安装node
[node.js官网](https://nodejs.org/en/download/)直接下载，安装时按照默认选项默认路径安装即可
详细安装教程可以参考[这里](http://jingyan.baidu.com/article/d5a880ebb97b0313f147ccdc.html)
安装成功之后，可以使用`node -v`命令查看当前Node的版本号

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-7885cab44ab5e19e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到我电脑目前的node版本号为**v6.7.0**

###little-cottage
little-cottage（最新版本 v1.1.9）是我们公司自己开发node应用，用于生成每次开发的项目目录及项目配置文件
####安装little-cottage

    npm install -g little-cottage
    
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-8a188091c8560f93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到目前安装的版本号为最新版本**1.1.9**

####使用little-cottage
######1.对于单站点项目，项目下全部资源模板发布至同一站点，
在项目父级目录执行

       cottage root

以我们之前创建的项目为例：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-152ca2cfd2de04f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里的三个目录如果没有的话会自动生成，最终的目录结构为：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-426b6ecdb640b904.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#####2.对于多站点项目，项目下需要针对不同站点单独建立相应的文件夹

在站点父级目录执行

        cottage + web1    /*此处web1为自己想要建立的站点的名字*/

代码执行完之后会发现自己项目文件夹下多了一个目录，此目录就是不同的站点相应的文件夹
  
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-486d17e651caa8c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###gulp及其任务依赖

####1.gulp
全局安装 gulp

        npm install -g gulp

####2.gulp任务依赖

保存[package.json](package.json)文件到自己的工作空间中,
在该目录下执行 `npm install`即可安装package中依赖的全部插件

#####使用webStorm来查看和调用gulp命令

在目录下的gulpfile.js文件右键找到 **Show Gulp Tasks**

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-b9c47bfe018a554f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在执行命令时，在gulp任务处双击即可


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-34d308ea0f678932.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

双击default会提示常用命令，再双击你所想要实现的命令即可。

gulp详细教程，参阅[gulp 中文文档](http://www.gulpjs.com.cn/docs/#articles/)

##二.前端开发流程

以演示项目地址`git@gitlab.trs.com:static-develpement/cn.git`为例

###开发流程图

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-43e7830653f809c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

无论是静态页面或是模版的开发都以dev分支为基础进行，静态页面开发前，前端需要跟项目经理沟通页面模块的划分，哪几个页面会一起上线，开发过程中每个功能模块需要单独创建分支，分支名使用模块对应功能英文名，

开发结束后从远程dev分支更新代码，并解决冲突，如无冲突，就可以提交该分支至远程，并将该分支merge到test分支并提交，预览

对已完成的静态页面，进行功能开发和制作模板时从相应的分支再创建新的分支进行开发，开发完成后从远程dev分支更新代码，并解决冲突，如无冲突，则可merge到test分支，并提交开发分支和test分支

上生产时，提交合并请求，由项目经理将开发分支merge到dev，并生成zip包，提交生产

###检出分支

在工作空间 /Users/msx/Mine 下克隆项目并检出分支dev，静态页面的开发请在各项目的dev分支下进行

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-9189ce29cb66ed28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

*在此处，是需要URL地址，就是以http打头的那个地址，如果使用的是SSH则会报错*

检出项目后可以看到cn项目的目录结构，分为移动站点mobile_site 和 pc_site，每个站点下可以看到如图的几个文件和文件夹

images下用于存放包括图片，css，js等资源文件

static下存放开发过程中的静态页面

template下存放wcm模版

config.json 作为gulp任务依赖配置文件，详细参数会在后面的内容中说明

gulpfile.js 设置需要执行的gulp任务以及任务依赖

###调试

在浏览器中的预览调试，可以通过调起gulp的debug任务，调起的方法直接双击选择WebStorm左下角的gulp任务即可，如果左下角没有显示gulp任务，可以在活动目录下的gulpfile.js右键选择显示gulp任务

在此处要双击的是上面所说到的gulp任务中的debug来进行调试，

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-a7e1c2079eecc9e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

开始调试之后会在默认浏览器中弹出该项目的页面


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-49ea5166c08a4738.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-b054ead13ad4dda8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此处有两个gulpfile.js文件，需要对哪个站点进行调试，则要运行哪个站点下的gulpfile.js文件。

##三、模板开发流程

###模板开发

在前端页面的基础上开发模板
模板的shtml存放在站点根目录的template目录,template中可以自己新建文件夹
**模板名称必须为全站点唯一,不允许重名**
站点的所有资源在images下（包括img、css、js等文件）
**这里要牢记，之前写项目的时候习惯img、css、js文件分在三个不同的文件夹下，以后要放在一起，已避免不必要的麻烦**

###发布

在这里，我在模板文件夹下新建了一个demo.html用来测试。

######将本次的修改添加到添加commit

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-913bfdeef3def6b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后写下本次的修改再提交即可


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-8fe47bcdf1343c1a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




##小结

webstorm运用的还不是很熟练，对于一些快捷键和命令还不能熟练掌握，以后要加强练习。

在没接触webstoem之前，我以为每个人写完项目都要把自己的项目复制粘贴到一个文件夹里，在通过Git Bass窗口进行提交，那样很麻烦也很慢。 webstorm可以直接进行本地库的提交和远程库的提交，而且比在Git bass窗口里敲代码更方便也不容易出错。

但是也有一个问题，我感觉webstorm对于一些代码的提示没有做到特别的好，也或许是我用习惯了别的编译器感觉对这个编译器不是很顺手。以后慢慢适应~





