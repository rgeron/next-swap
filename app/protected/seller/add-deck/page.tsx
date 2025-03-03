import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Plus, Tag, X } from "lucide-react";

export default function AddDeckPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Deck</h1>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Deck Details</TabsTrigger>
          <TabsTrigger value="cards">Flashcards</TabsTrigger>
          <TabsTrigger value="preview">Preview & Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Deck Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your deck"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn from this deck"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="9.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      Mathematics
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      Calculus
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Add a tag" />
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Popular tags:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Mathematics
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Physics
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Chemistry
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Biology
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Continue to Flashcards</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Flashcards</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-1">
                      <FileUp className="h-4 w-4" />
                      Import from File
                    </Button>
                    <Button className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Card
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="border-emerald-200">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="front1">Front</Label>
                          <Textarea
                            id="front1"
                            placeholder="Question or term"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="back1">Back</Label>
                          <Textarea
                            id="back1"
                            placeholder="Answer or definition"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="front2">Front</Label>
                          <Textarea
                            id="front2"
                            placeholder="Question or term"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="back2">Back</Label>
                          <Textarea
                            id="back2"
                            placeholder="Answer or definition"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Button variant="outline" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Another Card
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Back to Details</Button>
                  <Button>Continue to Preview</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Preview & Publish</h3>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-gray-500">Cover Image</p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold">
                        Mathematics Fundamentals
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">By You</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                          Mathematics
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                          Calculus
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">
                        This deck covers the fundamental concepts of mathematics
                        that every student should know. Perfect for high school
                        and early college students.
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div>Difficulty: Intermediate</div>
                        <div>Cards: 2</div>
                        <div>Price: $9.99</div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">Edit Details</Button>
                        <Button variant="outline">Edit Cards</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preview-cards">Preview Cards</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium mb-1">Front</div>
                        <p>What is the derivative of f(x) = x²?</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium mb-1">Back</div>
                        <p>f'(x) = 2x</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <h4 className="font-medium">Ready to publish?</h4>
                    <p className="text-sm text-gray-500">
                      Your deck will be available for purchase after review
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Publish Deck</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
