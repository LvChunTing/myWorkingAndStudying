#学习git、gitHub
Git是目前世界上比较先进的分布式版本控制系统
#####git基本流程图
![Markdown](http://i1.piimg.com/581381/ca8ea347e9bf1b39.png)
##git安装
从[https://git-for-windows.github.io](https://git-for-windows.github.io)网站下载git并安装，安装过程中，按照默认选项安装即可。

安装完成后，在开始菜单中找到“Git”->“Git Bass”，弹出类似cmd窗口一样的一个窗口，即代表安装成功。

![Markdown](http://i1.piimg.com/581381/0aa45466f36c02f1.png)
##创建和管理本地版本库
本地版本库就是流程图中所展示的本地仓库，可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。


#####第一步：找到一个合适的位置创建一个文件夹


	$ mkdir Study    /*这里mkdir是创建一个文件夹，后面是文件夹的名字，可自定义*/
	$ cd Study      /*cd命令进入刚刚创建的文件夹中*/
	$ pwd          /*pwd命令用于显示当前目录*/
此时，我的文件夹的位置是：`C:\Users\Administrator\Study`
![Markdown](http://p1.bpimg.com/581381/2c76d63b07ab4f28.png)


#####第二步：通过git init命令把这个目录变成Git可以管理的仓库

	$ git init   

![Markdown](http://p1.bpimg.com/581381/6b0eeb5e9115394a.png)

完成此步骤后会发现当前文件夹下多了一个`.git`目录，这个目录是Git来跟踪管理版本库的。

![Markdown](http://p1.bpimg.com/581381/19986c5e7ca2ce2f.png)

如果没有找到`.git`目录，也可能是因为`.git`目录默认是一个隐藏的文件夹，只需让自己电脑显示隐藏的文件夹就可以了。

点击**组织**按钮，找到**文件夹和搜索选项**->**显示隐藏的文件夹**就可以了。

![Markdown](http://i1.piimg.com/581381/b7d13dc8ce2151da.png)

![Markdown](http://i1.piimg.com/581381/8ef3db525924b0ec.png)


#####第三步：把文件添加到版本库

在当前版本库下添加一个`demo.txt`文件，内容如下：

	This is a demo.
	My name is LvChunting.
这里仅仅是为了测试，添加的文件以及内容可以随意自己定义。
**但是**一定要放到**刚刚建立的版本库的目录下（或者子目录下**），因为这是一个Git仓库，放到其他地方Git再厉害也找不到这个文件。

然后用命令`git add`告诉Git，把文件添加到仓库：

	$ git add demo.txt
再用命令`git commit`告诉Git，把文件提交到仓库：

	$ git commit -m "wrote a demo file" /*-m后面输入的是本次提交的说明,可以输入任何内容，但是最好有意义*/
![Markdown](http://p1.bpimg.com/581381/272e859c2417419c.png)

也可以一次传多个文件：

	$ git add file1.txt
	$ git add file2.txt file3.txt
	$ git commit -m "add 3 files."
##远程仓库
Git是分布式版本控制系统，同一个Git仓库，可以分布到不同的机器上。而如果要把自己的本地库分布到不同的机器上会造成极大的麻烦，所以我们需要一个远程仓库来让不同的机器可以随时访问和操作库中的内容，从而实现同一个Git仓库分布到不同的机器上。在这里我们使用的是GitHub的远程仓库。

###配置远程仓库

由于本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：

#####第一步：创建SSH Key

在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

	$ ssh-keygen -t rsa -C "ownemail@some.com"    /*此处的e-mail地址要是自己的邮箱地址*/

用户主目录下的`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这就是SSH Key的密钥对，`id_rsa`是私钥，不能泄露出去。`id_rsa.pub`是公钥，可以告诉别人。

#####第二步：配置SSH Key
登陆GitHub，按照如图所示步骤，打开“Account settings”，“SSH Keys”页面。
![Markdown](http://p1.bpimg.com/581381/43c6800797b0bcf1.png)

然后，点“New SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

![Markdown](http://p1.bqimg.com/581381/829874cf4359d3bd.png)

点击“Add SSH Key”即可看到已经添加的SSH Key:

![Markdown](http://p1.bqimg.com/581381/543c397961d2836e.png)


**SSH Key存在的意义在于：**GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

GitHub允许添加多个Key。只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

###添加远程仓库

####创建一个远程库：
**第一步：**登录GitHub，然后，在右上角找到“New repository”按钮，创建一个新的仓库：
![Markdown](http://p1.bpimg.com/581381/a5982dcbe6a20925.png)
**第二步：**在新加载的页面中的Repository name填入你想要的仓库的名字（我这里是Study），其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：
![Markdown](http://p1.bpimg.com/581381/0e156d45a18322d8.png)

新建的GitHub远程仓库的初始状态是这样的：
![Markdown](http://i1.piimg.com/581381/c8e3742bdd50af8f.png)

目前，在GitHub上的这个Study仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

####将本地仓库推送到GitHub远程仓库：


#####第一步：将已有的本地仓库与之关联
在本地的Git库下运行命令：（此处我的本地库是Study）

	$ git remote add origin git@github.com:LvChunTing/Study.git

**注意：**此处LvChunTing代表的是自己的GitHub的账号名字。也可以直接复制SSH地址

![Markdown](http://i1.piimg.com/581381/ce8b42b400c48c27.png)

![Markdown](http://i1.piimg.com/581381/bee8b2c2caae5d72.png)

添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

#####第二步：将本地库中的所有东西推送到远程库中：

	$ git push -u origin master	

由于是第一次推送，所以要加上`-u`属性，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令：

	$ git push origin master	
    
推送完成之后的显示结果是：

![Markdown](http://i1.piimg.com/581381/b03001c9028b5e6a.png)

在自己的GitHub远程仓库中，会看到已经新增了一个我们写过的文件

![Markdown](http://i1.piimg.com/581381/2feb107f15dc3276.png)

到现在为止，我们已经有了一个真正意义上的分布式版本库！


##使用Web Storm新建一个项目，并提交到gitHub

####在GitHub中新建一个库用来关联新建的项目
我这里新建的库名字为StudyPro

####将远程库克隆到本地

点击相关选项并在弹出的窗口填写自己新建的远程库地址，将远程库克隆到本地。
![Markdown](http://p1.bqimg.com/581381/4189bc22ef5c3fb4.png)

![Markdown](http://p1.bqimg.com/581381/7be99a686881808d.png)
####新建一个项目并Push到远程库：
打开Web Storm的**File->New->Project**，根据弹出的窗口选择要新建的项目类型、名称··· ··· 根据自己的需要新建适当的项目。
	
![Markdown](http://p1.bpimg.com/581381/427e828a20a77e31.png)

![Markdown](http://p1.bpimg.com/581381/5c672b680b562386.png)

在项目中新建文件的时候会弹出提示：

![Markdown](http://i1.piimg.com/581381/8b1be1b27c01694d.png)

点击YES会发现新建的文件颜色会变成绿色，代表已经新增到本地库：

![Markdown](http://i1.piimg.com/581381/c31c21bfee9cc71d.png)

项目新建完成或者修改完成之后，要提交你的修改或者新建，按照如图步骤来操作并填写自己要提交的信息：

![Markdown](http://i1.piimg.com/581381/62c909d9ba874dfc.png)

![Markdown](http://i1.piimg.com/581381/06084d46f96f6fcb.png)

然后点击响应的按钮，正如所说的，commit仅仅是提交到本地本次的修改，而commit and push就是说明要提交到本地并push到远程仓库

![Markdown](http://p1.bpimg.com/581381/007374f34ea96c0f.png)

当如下提示时，代表push成功

![Markdown](http://p1.bqimg.com/581381/fbc67fb3489ff66c.png)

然后刷新你的GitHub页面会发现你的远程库下多了你新建的项目文件

![Markdown](http://p1.bqimg.com/581381/3ea918418e41a2cc.png)

####从远程库Pull：
![Markdown](http://p1.bqimg.com/581381/6b31641e1332340c.png)

在VCS选项卡下Git会有Pull选项，点击会出现Pull的弹出框

![Markdown](http://p1.bqimg.com/581381/b928403e8c2014b9.png)

根据自己的需求选择需要Pull的文件或者分支即可完成Pull。

##*问题：*
*	git的Clone和Pull有什么区别？不都是从远程库拿文件到本地吗？


		git clone是把整个git项目拷贝下来，包括里面的日志信息，git项目里的分支，你也可以直接切换、使用里面的分支等等。

		git pull相当于git fetch和git merge。其意思是先从远程下载git项目里的文件，然后将文件与本地的分支进行merge。

		clone是本地没有repository时，将远程repository整个下载过来。

		pull是本地有repository时，将远程repository里新的commit数据(如有的话)下载过来，并且与本地代码merge。
 		
		我个人理解，git clone相当于之前没有安装过这个游戏，这次是对这个游戏的完全下载安装。

		           git pull相当于之前已经安装了游戏，这次只是对游戏进行更新。
#####其他文档：

[常用的Git命令](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[git使用简易指南](http://www.bootcss.com/p/git-guide/)

[Git教程 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

[Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

