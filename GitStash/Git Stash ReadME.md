在最近的工作中遇到了一个问题，就是在某一个分支中做出了修改，但是不想commit，所以我就没commit我修改的文件。但是当我要切到另一个分支的时候，git抛出了这样的一个错误，让我很是懵逼。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-9003e534bb813f8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个代表我在当前的分支中对文件做出了修改，但是没有commit本次修改，如果切到其他分支后，会覆盖修改的内容产生危险操作，所以系统会抛出这样的错误。

解决这个问题的方法有两个，第一个是commit你的修改，再一个就是将你的修改利用stash放入暂存区。这时候你的工作区间和上一次提交的内容是完全一样的。这样就可以进行其他的操作了。

####问题重现

我在dev分支上，对文件做出了修改，commit之后再切换到test分支，是正常的。。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-6d5625ecd42b02d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后我再次在dev分支上修改内容，只add不commit然后再去切换到test分支上


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-e1626ceb9c21420f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![然后就抛出了这样一个错误](http://upload-images.jianshu.io/upload_images/4059751-d793057927ac4179.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后我就要把这部分区域先放入暂存区

        git stash save "本次提交暂存区的内容"//这里""里的内容，与commit类似，用于区分

然后再去执行切换分支操作，就会成功

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-5fac1f7645600498.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后切回dev分支，可以看到当前的文件中，我们上次修改过得东西已经没了

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-ef42358e340fac26.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


那么我们的修改去哪里了呢？我们可以利用git命令查看所有暂存区内的内容

        git stash list//查看所有存在暂存区内的内容


![这里我之前写过一个 没有删除...为了区分每次的内容](http://upload-images.jianshu.io/upload_images/4059751-b0347d9a4b58c760.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在暂存区中找到我们之前暂存的内容，就可以将暂存区的内容拿出来进行以后的修改了。这里我们之前写入的内容是“dev不想commit”，所以我们就要找到对应的stash@｛？｝

        git stash pop --index stash@{?}//?是一个数字，对应list里的内容
        git stash pop stash@{?}


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-8b4e4cb0eed15341.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后文件中的内容又恢复到了之前的情况


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4059751-e8bb105c9b393521.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####常用的一些git stash命令

        git stash: 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
        git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
        git stash list: 显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。
        git stash clear: 清空Git栈。此时使用gitg等图形化工具会发现，原来stash的哪些节点都消失了。

#####注：如果还原工作区的文件内容又做出了改动，并且与暂存区不一样，要commit之后再去暂存区内拿保存的内容。并merge。